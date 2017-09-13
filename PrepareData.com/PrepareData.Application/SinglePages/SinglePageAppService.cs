using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using PrepareData.SinglePages.Dto;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace PrepareData.SinglePages
{

    public class SinglePageAppService : PrepareDataAppServiceBase, ISinglePageAppService
    {
        private readonly SinglePageManager _singlePageManager;
        private readonly IRepository<SinglePage, int> _singlePageRepository;
        public SinglePageAppService(
            SinglePageManager singlePageManager,
            IRepository<SinglePage, int> singlePageRepository)

        {
            _singlePageManager = singlePageManager;
            _singlePageRepository = singlePageRepository;
        }
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public int CreateSinglePageAndGetId(SinglePageDto input)
        {

            SinglePage model = new SinglePage
            {
                TenantId = AbpSession.TenantId,
                Title = input.Title,
                Introduce = input.Introduce,
                Content = input.Content,
                Picture = input.Picture,
                NavigationMenuId = input.NavigationMenuId,
                IsPublish=input.IsPublish,
                PublishTime=DateTime.Now,

            };
            return _singlePageRepository.InsertAndGetId(model);
        }
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task Update(SinglePageDto input)
        {
            var model = await _singlePageRepository.GetAsync(input.Id);
            model.Title = input.Title;
            model.Introduce = input.Introduce.Trim();
            model.Content = input.Content;
            model.Picture = input.Picture == null ? "" : input.Picture;
            model.NavigationMenuId = input.NavigationMenuId;
            model.IsPublish = input.IsPublish;
            model.PublishTime = DateTime.Now;
        }
        public async Task<SinglePageDto> GetDetail(int Id)
        {
            var model = await _singlePageRepository.FirstOrDefaultAsync(x => x.Id == Id);
            return model == null ? new SinglePageDto() { IsPublish = "1", PublishTime = DateTime.Now } : model.MapTo<SinglePageDto>();
        }

        /// <summary>
        /// 提供给首页的单页信息
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<dynamic> GetHomeSigeInfo(EntityRequestInput<int> input,int? tenantId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var model = await _singlePageRepository.FirstOrDefaultAsync(x => x.NavigationMenuId == input.Id && x.IsPublish == "1");
                if (model == null)
                    return "";
                return new
                {
                    NavId = model.NavigationMenuId,
                    Nav = model.NavigationMenu.Name,
                    Title = model.Title,
                    Picture = model.Picture,
                    Introduce = model.Introduce
                };
            }
        }

        /// <summary>
        /// 提供给单页信息
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<dynamic> GetSigePageInfo(EntityRequestInput<int> input, int? tenantId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var model = await _singlePageRepository.FirstOrDefaultAsync(x => x.NavigationMenuId == input.Id && x.IsPublish == "1");
                if (model == null)
                    return "";
                return new
                {
                    NavId = model.NavigationMenuId,
                    Nav = model.NavigationMenu.Name,
                    Title = model.Title,
                    Picture = model.Picture,
                    Content = model.Content,
                    Date = model.PublishTime.ToString("yyyy-MM-dd")
                };
            }
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public async Task Cancel(int Id)
        {
            var model = await _singlePageRepository.GetAsync(Id);
            await _singlePageRepository.DeleteAsync(model);
        }

        public async Task<SinglePageListOutput> GetPageList(SinglePageListInput input)
        {
            var query = _singlePageRepository.GetAll().Include("NavigationMenu");
            if (!string.IsNullOrEmpty(input.Title))
                query = query.Where(e => e.Title.Contains(input.Title));
            var list = await query.OrderByDescending(e => e.CreationTime).Skip(input.start).Take(input.length).ToListAsync();
            var pageList = new SinglePageListOutput()
            {
                draw = input.draw,
                recordsTotal = query.Count(),
                recordsFiltered = query.Count(),
                data = list.MapTo<List<SinglePageDto>>()
            };
            return pageList;
        }
    }
}
