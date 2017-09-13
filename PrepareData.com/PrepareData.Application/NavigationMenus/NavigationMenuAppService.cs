using System.Threading.Tasks;
using PrepareData.NavigationMenus.Dtos;
using Abp.Domain.Repositories;
using Abp.UI;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System.Linq;
using System.Collections.Generic;
using System.Data.Entity;
using PrepareData.TenantGroups.Dtos;
using System;

namespace PrepareData.NavigationMenus
{
    public class NavigationMenuAppService : PrepareDataAppServiceBase, INavigationMenuAppService
    {

        private readonly IRepository<NavigationMenu, int> _repository;

        public NavigationMenuAppService(IRepository<NavigationMenu, int> repository)
        {
            _repository = repository;
        }

        //新增
        public async Task Create(NavigationMenuDto input)
        {
            //
            input.ParentId = input.ParentId == -1 ? null : input.ParentId;
            var @nMenu = await _repository.FirstOrDefaultAsync(e => e.Name == input.Name && e.ParentId == input.ParentId);

            if (@nMenu != null)
            {
                throw new UserFriendlyException(string.Format("Navigation Menu '{0}' has been created. ", input.Name));
            }
            @nMenu = new NavigationMenu
            {
                TenantId = AbpSession.TenantId,
                Name = input.Name,
                Type = input.Type.HasValue ? input.Type.Value : 0,
                OrderBy = input.OrderBy,
                IsActive = input.IsActive,
                ParentId = input.ParentId
            };
            await _repository.InsertAsync(@nMenu);
        }

        //删除
        public async Task Cancel(int id)
        {
            try
            {

            var model = await _repository.GetAsync(id);
            await _repository.DeleteAsync(model);
            }
            catch (Exception)
            {

                 throw new UserFriendlyException("删除失败");
            }

        }

        /// <summary>
        /// 修改
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task Update(NavigationMenuDto input)
        {
            var model = await _repository.GetAsync(input.Id);
            model.Name = input.Name;
            model.Type = input.Type.HasValue ? input.Type.Value : 0;
            model.OrderBy = input.OrderBy;
            model.IsActive = input.IsActive;
            model.ParentId = input.ParentId == -1 ? null : input.ParentId;
        }

        public async Task<NavigationMenuDto> GetDetail(EntityRequestInput<int> input)
        {
            var model = await _repository.FirstOrDefaultAsync(input.Id);
            return model == null ? new NavigationMenuDto() { IsActive = true } : model.MapTo<NavigationMenuDto>();
        }

        public async Task<NavigationMenuPageList> GetPageList(NavigationMenuPageListInput input)
        {
            var query = _repository.GetAll();
            if (!string.IsNullOrEmpty(input.Name))
                query = query.Where(e => e.Name.Contains(input.Name));
            //if (input.ParentId.HasValue)
            query = query.Where(o => o.ParentId == input.ParentId.Value);
            var list = await query.OrderBy(e => e.OrderBy).Skip(input.start).Take(input.length).ToListAsync();
            var pageList = new NavigationMenuPageList()
            {
                draw = input.draw,
                recordsTotal = query.Count(),
                recordsFiltered = query.Count(),
                data = list.MapTo<List<NavigationMenuDto>>()
            };
            return pageList;
        }

        public async Task<List<SelectOutput>> GetSelectList(int type = 0)
        {
            return await _repository.GetAll().Where(o => o.IsActive == true && o.Type == type && o.ParentId != null)
                .Select(o => new SelectOutput { Id = o.Id, Text = o.Name }).ToListAsync<SelectOutput>();
        }
        /// <summary>
        /// 加载树
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public ListResultOutput<NavigationMenuDto> GetListTree(NavigationMenuDto input)
        {
            using (CurrentUnitOfWork.SetTenantId(input.TenantId))
            {
                var query = _repository.GetAll();
                if (input.ParentId.HasValue)
                    query = query.Where(o => o.ParentId == input.ParentId.Value);
                else
                    query = query.Where(o => o.ParentId == null);
                if (input.IsActive)
                    query = query.Where(o => o.IsActive == input.IsActive);
                if (input.Type.HasValue)
                    query = query.Where(o => o.Type == input.Type.Value);

                var list = query.OrderBy(o => o.OrderBy).ToList();

                return new ListResultOutput<NavigationMenuDto>(list.MapTo<List<NavigationMenuDto>>());
            }
        }
    }
}
