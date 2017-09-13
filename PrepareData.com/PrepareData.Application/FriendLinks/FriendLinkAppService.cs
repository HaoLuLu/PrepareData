using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using PrepareData.FriendLinks.Dto;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace PrepareData.FriendLinks
{

    public class FriendLinkAppService : PrepareDataAppServiceBase, IFriendLinkAppService
    {
        private readonly FriendLinkManager _friendLinkManager;
        private readonly IRepository<FriendLink, int> _friendLinkRepository;
        public FriendLinkAppService(
            FriendLinkManager friendLinkManager,
            IRepository<FriendLink, int> friendLinkRepository)

        {
            _friendLinkManager = friendLinkManager;
            _friendLinkRepository = friendLinkRepository;
        }
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public int CreateFriendLinkAndGetId(FriendLinkDto input)
        {

            FriendLink model = new FriendLink
            {
                TenantId = AbpSession.TenantId,
                Name = input.Name,
                Url = input.Url,
                OrderBy = input.OrderBy,
                Picture = input.Picture == null ? "" : input.Picture,
                Type = input.Type
            };
            return _friendLinkManager.InsertFriendLink(model);
        }
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task Update(FriendLinkDto input)
        {
            var model = await _friendLinkRepository.GetAsync(input.Id);
            model.Name = input.Name;
            model.Url = input.Url;
            model.OrderBy = input.OrderBy;
            model.Picture = input.Picture == null ? "" : input.Picture;
        }
        public async Task<FriendLinkDto> GetDetail(EntityRequestInput<int> input)
        {
            if (input.Id <= 0)
                return new FriendLinkDto();
            var model = await _friendLinkRepository.GetAsync(input.Id);
            return model == null ? new FriendLinkDto() : model.MapTo<FriendLinkDto>();
        }
        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public async Task Cancel(int Id)
        {
            var model = await _friendLinkRepository.GetAsync(Id);
            await _friendLinkRepository.DeleteAsync(model);
        }

        public async Task<FriendLinkPageListOutput> GetPageList(FriendLinkPageListInput input)
        {
            var query = _friendLinkRepository.GetAll().Where(e => e.Type == input.Type);
            if (!string.IsNullOrEmpty(input.Name))
                query = query.Where(e => e.Name.Contains(input.Name));
            var list = await query.OrderByDescending(e => e.OrderBy).Skip(input.start).Take(input.length).ToListAsync();
            var pageList = new FriendLinkPageListOutput()
            {
                draw = input.draw,
                recordsTotal = query.Count(),
                recordsFiltered = query.Count(),
                data = list.MapTo<List<FriendLinkDto>>()
            };
            return pageList;
        }

        
        /// <summary>
        /// 提供给首页的轮播图信息
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<dynamic> GetHomeSliders(EntityRequestInput<int> input, int? tenantId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var model = await _friendLinkRepository.FirstOrDefaultAsync(x => x.Type == 1);
                if (model == null)
                    return "";
                return new
                {
                    Url = model.Url,
                    Title = model.Name,
                    Picture = model.Picture
                };
            }
        }



        /// <summary>
        /// 提供给首页的链接信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<List<FriendLinkInfoDto>> GetHomeLinks(EntityRequestInput<int> input, int? tenantId,int type=-1)
        {
            List<FriendLinkInfoDto> list = new List<FriendLinkInfoDto>();
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
            var query = _friendLinkRepository.GetAll().Where(o=>o.Type==type);
            var links = await query.OrderBy(e => e.OrderBy).ToListAsync();
                foreach (var item in links)
                {
                    list.Add(new FriendLinkInfoDto
                    {
                        Id = item.Id,
                        Name = item.Name,
                        Picture = item.Picture,
                        Url=item.Url
                    });
                }
            }
            return list;
        }

    }
}