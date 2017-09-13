using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using PrepareData.TenantGroups.Dtos;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.AutoMapper;
using System.Data.Entity;
using Abp.Authorization;

namespace PrepareData.TenantGroups
{
    public class TenantGroupAppService: PrepareDataAppServiceBase, ITenantGroupAppService
    {
        private readonly IRepository<TenantGroup, int> _repository;
        public TenantGroupAppService(IRepository<TenantGroup, int> repository)
        {
            _repository = repository;
        }

        
        //新增
        public async Task Create(CreateTenantGroupInput input)
        {
            var @TenantGroup = await _repository.FirstOrDefaultAsync(e => e.Name == input.Name);
            if (@TenantGroup != null)
            {
                throw new UserFriendlyException(string.Format("TenantGroup '{0}' has been created. ", input.Name));
            }
            @TenantGroup = new TenantGroup
            {
                Name = input.Name,
                EnglishName = input.EnglishName,
                OrderBy = input.OrderBy,
                IsActive = input.IsActive
            };
            await _repository.InsertAsync(@TenantGroup);
        }

        //删除
        public async Task Cancel(int id)
        {
            var model = await _repository.GetAsync(id);
            await _repository.DeleteAsync(model);
        }

        /// <summary>
        /// 修改
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task Update(CreateTenantGroupInput input)
        {
            var model = await _repository.GetAsync(input.Id);
            model.Name = input.Name;
            model.EnglishName = input.EnglishName;
            model.OrderBy = input.OrderBy;
            model.IsActive = input.IsActive;
        }

        public async Task<ListResultOutput<TenantGroupDto>> GetList(TenantGroupDto input)
        {
            var docs = await _repository
                    .GetAll()
                    .OrderByDescending(e => e.OrderBy)
                    .ToListAsync();

            return new ListResultOutput<TenantGroupDto>(docs.MapTo<List<TenantGroupDto>>());
        }

        public async Task<TenantGroupPageList> GetPageList(TenantGroupPageListInput input)
        {
            var query = _repository.GetAll();
            if (!string.IsNullOrEmpty(input.Name))
                query = query.Where(e => e.Name.Contains(input.Name));
            var list = await query.OrderBy(e => e.OrderBy).Skip(input.start).Take(input.length).ToListAsync();
            var pageList = new TenantGroupPageList()
            {
                draw = input.draw,
                recordsTotal = query.Count(),
                recordsFiltered = query.Count(),
                data = list.MapTo<List<TenantGroupDto>>()
            };
            return pageList;
        }

        public async Task<TenantGroupDto> GetDetail(EntityRequestInput<int> input)
        {
            var model = await _repository.FirstOrDefaultAsync(input.Id);
            return model == null ? new TenantGroupDto() { IsActive=true} : model.MapTo<TenantGroupDto>();
        }

        public async Task<List<SelectOutput>> GetSelectList()
        {
            return await _repository.GetAll().Where(o=>o.IsActive==true).Select(o => new SelectOutput { Id = o.Id, Text = o.Name }).ToListAsync<SelectOutput>();
        }

        /// <summary>
        /// 提供给汇总页的机构组信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<dynamic> GetTenantGroupsInfo(EntityRequestInput<int> input)
        {
            var model = await  _repository.GetAll().Where(o=>o.IsActive==true).OrderBy(e => e.OrderBy).ToListAsync(); 
            if (model == null)
                return "";
            return new ListResultOutput<TenantGroupDto>(model.MapTo<List<TenantGroupDto>>());
        }
    }
}
