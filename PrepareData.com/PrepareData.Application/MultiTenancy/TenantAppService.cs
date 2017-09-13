using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Extensions;
using Abp.MultiTenancy;
using Abp.Runtime.Security;
using PrepareData.Authorization;
using PrepareData.Authorization.Roles;
using PrepareData.Editions;
using PrepareData.MultiTenancy.Dto;
using PrepareData.Users;
using System.Data.Entity;
using System;
using PrepareData.ChildSysConfigs;
using Abp.Domain.Repositories;
using PrepareData.EntityFramework;
using PrepareData.Migrations.SeedData;
using Abp.Domain.Uow;

namespace PrepareData.MultiTenancy
{
    [AbpAuthorize(PermissionNames.Pages_Tenants)]
    public class TenantAppService : PrepareDataAppServiceBase, ITenantAppService
    {
        private const int MaxTenants = 10;  //汇总页显示的联盟机构数量
        private readonly TenantManager _tenantManager;
        private readonly RoleManager _roleManager;
        private readonly EditionManager _editionManager;
        private readonly IAbpZeroDbMigrator _abpZeroDbMigrator;
        private readonly IRepository<ChildSysConfig> _childSysConfigRepository;
        private readonly PrepareDataDbContext _context;

        public TenantAppService(
            TenantManager tenantManager,
            RoleManager roleManager,
            EditionManager editionManager,
            IAbpZeroDbMigrator abpZeroDbMigrator,
            IRepository<ChildSysConfig> childSysConfigRepository,
            PrepareDataDbContext context)
        {
            _tenantManager = tenantManager;
            _roleManager = roleManager;
            _editionManager = editionManager;
            _abpZeroDbMigrator = abpZeroDbMigrator;
            _childSysConfigRepository = childSysConfigRepository;
            _context = context;
        }

        public ListResultOutput<TenantListDto> GetTenants()
        {
            return new ListResultOutput<TenantListDto>(
                _tenantManager.Tenants
                    .OrderBy(t => t.TenancyName)
                    .ToList()
                    .MapTo<List<TenantListDto>>()
                );
        }

        public async Task CreateTenant(CreateTenantInput input)
        {
            //Create tenant
            var tenant = input.MapTo<Tenant>();
            tenant.ConnectionString = input.ConnectionString.IsNullOrEmpty()
                ? null
                : SimpleStringCipher.Instance.Encrypt(input.ConnectionString);

            var defaultEdition = await _editionManager.FindByNameAsync(EditionManager.DefaultEditionName);
            if (defaultEdition != null)
            {
                tenant.EditionId = defaultEdition.Id;
            }

            CheckErrors(await TenantManager.CreateAsync(tenant));
            await CurrentUnitOfWork.SaveChangesAsync(); //To get new tenant's id.

            //Create tenant database
            _abpZeroDbMigrator.CreateOrMigrateForTenant(tenant);

            //We are working entities of new tenant, so changing tenant filter
            using (CurrentUnitOfWork.SetTenantId(tenant.Id))
            {

                new DefaultChildSysConfigsCreator(_context).Create(tenant.Id);

                //Create static roles for new tenant
                CheckErrors(await _roleManager.CreateStaticRoles(tenant.Id));

                await CurrentUnitOfWork.SaveChangesAsync(); //To get static role ids

                //grant all permissions to admin role
                var adminRole = _roleManager.Roles.Single(r => r.Name == StaticRoleNames.Tenants.Admin);
                await _roleManager.GrantAllPermissionsAsync(adminRole);

                //Create admin user for the tenant
                var adminUser = User.CreateTenantAdminUser(tenant.Id, input.AdminEmailAddress, User.DefaultPassword);
                CheckErrors(await UserManager.CreateAsync(adminUser));
                await CurrentUnitOfWork.SaveChangesAsync(); //To get admin user's id

                //Assign admin user to role!
                CheckErrors(await UserManager.AddToRoleAsync(adminUser.Id, adminRole.Name));
                await CurrentUnitOfWork.SaveChangesAsync();
            }
        }

        /// <summary>
        /// 加载一条记录下的详细信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<TenantGetListDto> GetDetail(EntityRequestInput<int> input)
        {
            if (input.Id <= 0)
                return new TenantGetListDto() { IsHot = true, IsActive = true, AuthorizedEndTime = System.DateTime.Now };
            var model = await _tenantManager.GetByIdAsync(input.Id);
            return model == null ? new TenantGetListDto() { IsHot = true, IsActive = true, AuthorizedEndTime = System.DateTime.Now } : model.MapTo<TenantGetListDto>();
        }

        /// <summary>
        /// 删除一条记录
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task Cancel(int id)
        {
            var @tenant = await _tenantManager.GetByIdAsync(id);
            await _tenantManager.DeleteAsync(@tenant);
        }

        /// <summary>
        /// 更新记录
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task Update(UpdateTenantInput input)
        {
            var model = await _tenantManager.GetByIdAsync(input.Id);
            model.Name = input.Name;
            model.ConnectionString = (input.ConnectionString.IsNullOrEmpty() ? null : SimpleStringCipher.Instance.Encrypt(input.ConnectionString));
            model.Contact = input.Contact;
            model.ContactTel = input.ContactTel;
            model.E_Mail = input.E_Mail;
            model.Address = input.Address;
            model.AuthorizedEndTime = input.AuthorizedEndTime;
            model.IsHot = input.IsHot;
            model.TenantGroupId = input.TenantGroupId;
            model.Picture = input.Picture;
            model.OrderBy = input.OrderBy;
        }

        /// <summary>
        /// 获得分页数据
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<TenantPageListOutput> GetPageList(TenantPageListInput input)
        {
            var query = _tenantManager.Tenants.Include("TenantGroup");
            if (!string.IsNullOrEmpty(input.Name))
                query = query.Where(e => e.Name.Contains(input.Name));
            var list = await query.OrderByDescending(e => e.CreationTime).Skip(input.start).Take(input.length).ToListAsync();
            var pageList = new TenantPageListOutput()
            {
                draw = input.draw,
                recordsTotal = query.Count(),
                recordsFiltered = query.Count(),
                data = list.MapTo<List<TenantGetListDto>>()
            };
            return pageList;
        }


        /// <summary>
        /// 提供给汇总页的机构信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<List<TenantInfoDto>> GetTenantsInfo(EntityRequestInput<int> input)
        {
            if (await _tenantManager.Tenants.CountAsync(e => e.TenantGroupId == input.Id) < 1)
                return new List<TenantInfoDto>();
            var query = _tenantManager.Tenants.Include("TenantGroup").Where(e => e.TenantGroupId == input.Id && e.IsHot == true && e.IsActive == true && e.AuthorizedEndTime >= DateTime.Now && e.OrderBy >0);
            var tenants = await query.OrderBy(e => e.OrderBy).Take(MaxTenants).ToListAsync();
            List<TenantInfoDto> list = new List<TenantInfoDto>();
            ChildSysConfig config;
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
            {
                foreach (var item in tenants)
                {
                    config = await _childSysConfigRepository.FirstOrDefaultAsync(o => o.TenantId == item.Id && o.Name == "template");
                    list.Add(new TenantInfoDto
                    {
                        Id = item.Id,
                        Name = item.Name,
                        Picture = item.Picture,
                        Template = (config.Value == null ? EnumTemplate.template1 : (EnumTemplate)config.Value).ToString()
                    });
                }
            }
            return list;
        }

    }

    public enum EnumTemplate
    {
        template1 = 1,
        template2 = 2,
        template3 = 3,
        template4 = 4,
        template5 = 5,
        template6 = 6,
        template7 = 7,
        template8 = 8,
        template9 = 9,
        template10 = 10,
    }
}