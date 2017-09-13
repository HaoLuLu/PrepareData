using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using PrepareData.Articles.Dto;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace PrepareData.Articles
{

    public class ArticleAppService : PrepareDataAppServiceBase, IArticleAppService
    {
        private readonly ArticleManager _articleManager;
        private readonly IRepository<Article, int> _articleRepository;
        public ArticleAppService(
            ArticleManager articleManager,
            IRepository<Article, int> articleRepository)

        {
            _articleManager = articleManager;
            _articleRepository = articleRepository;
        }
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public int CreateArticleAndGetId(ArticleDto input)
        {

            Article model = new Article
            {
                TenantId = AbpSession.TenantId,
                Title = input.Title,
                Introduce = input.Introduce,
                Content = input.Content,
                Source = input.Source,
                keywords = input.keywords,
                Author = input.Author,
                IstoWeb = input.IstoWeb,
                IstoNotice = input.IstoNotice,
                IsTop = input.IsTop,
                IsCheck = input.IsCheck,
                Picture = input.Picture == null ? "" : input.Picture,
                PublishTime = input.PublishTime,
                NavigationMenuId = input.NavigationMenuId,
            };
            return _articleManager.InsertArticle(model);
        }
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task Update(ArticleDto input)
        {
            var model = await _articleRepository.GetAsync(input.Id);
            model.Title = input.Title;
            model.Introduce = input.Introduce;
            model.Content = input.Content;
            model.Source = input.Source;
            model.keywords = input.keywords;
            model.Author = input.Author;
            model.IstoWeb = input.IstoWeb;
            model.IstoNotice = input.IstoNotice;
            model.IsTop = input.IsTop;
            model.IsCheck = input.IsCheck;
            model.Picture = input.Picture == null ? "" : input.Picture;
            model.PublishTime = input.PublishTime;
            model.NavigationMenuId = input.NavigationMenuId;
        }
        public async Task<ArticleDto> GetDetail(int Id)
        {
            var model = await _articleRepository.FirstOrDefaultAsync(x => x.Id == Id);
            return model == null ? new ArticleDto() { IsTop = false, IsCheck = true, PublishTime = DateTime.Now } : model.MapTo<ArticleDto>();
        }
        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public async Task Cancel(int Id)
        {
            var model = await _articleRepository.GetAsync(Id);
            await _articleRepository.DeleteAsync(model);
        }

        public async Task<ArticlePageListOutput> GetPageList(ArticlePageListInput input)
        {
            var query = _articleRepository.GetAll();
            if (!string.IsNullOrEmpty(input.Title))
                query = query.Where(e => e.Title.Contains(input.Title));
            var list = await query.OrderByDescending(e => e.CreationTime).Skip(input.start).Take(input.length).ToListAsync();
            var pageList = new ArticlePageListOutput()
            {
                draw = input.draw,
                recordsTotal = query.Count(),
                recordsFiltered = query.Count(),
                data = list.MapTo<List<ArticleListDto>>()
            };
            return pageList;
        }

        public async Task<List<ArticleListDto>> GetList(ArticleListInput input)
        {
            var query = _articleRepository.GetAll();
            if (input.NavigationMenuId.HasValue)
                query = query.Where(e => e.NavigationMenuId == input.NavigationMenuId.Value);
            if (!string.IsNullOrEmpty(input.Title))
                query = query.Where(e => e.Title.Contains(input.Title));
            var list = await query.OrderByDescending(e => e.CreationTime)
                .ToListAsync();
            return list.MapTo<List<ArticleListDto>>();
        }

        /// <summary>
        /// 提供给首页的多页列表信息
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<dynamic> GetHomeArticleList(EntityRequestInput<int> input, int? tenantId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var list = await _articleRepository.GetAll().Include(o => o.NavigationMenu).Where(x => x.NavigationMenuId == input.Id).OrderByDescending(e=>e.PublishTime)
                    .ToListAsync();
                if (list == null || list.Count < 1)
                    return "";
                return (from a in list
                        select new
                        {
                            NavId = a.NavigationMenuId,
                            Nav = a.NavigationMenu.Name,
                            Id = a.Id,
                            Title = a.Title,
                            Picture = a.Picture,
                            Introduce = ReplaceHtmlTag(a.Content, 100),
                            IsTop = a.IsTop,
                            Date = a.PublishTime.ToString("yyyy-MM-dd")
                        }).ToList();
            }
        }

        [AbpAllowAnonymous]
        public async Task<dynamic> GetHomeArticleList(EntityRequestInput<string> input, int? tenantId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                if (string.IsNullOrEmpty(input.Id))
                    return "";
                var nids = input.Id.Split(',').Select(o => int.Parse(o)).ToList();
                if (nids == null || nids.Count < 1)
                    return "";
                var list = await _articleRepository.GetAll().Include(o => o.NavigationMenu).Where(x => nids.Contains(x.NavigationMenuId.Value)).OrderByDescending(e => e.PublishTime).ToListAsync();
                if (list == null || list.Count < 1)
                    return "";
                return from n in nids
                       select new
                       {
                           NavId = n,
                           Items = from a in list.Where(x => x.NavigationMenuId == n)
                                   select new
                                   {
                                       NavId = n,
                                       Nav = a.NavigationMenu.Name,
                                       Id = a.Id,
                                       Title = a.Title,
                                       Picture = a.Picture,
                                       Introduce = ReplaceHtmlTag(a.Content, 100),
                                       IsTop = a.IsTop,
                                       Date = a.PublishTime.ToString("yyyy-MM-dd")
                                   }
                       };
            }
        }

        /// <summary>
        /// 多页信息
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<dynamic> GetArticlePage(EntityRequestInput<int> input, int? tenantId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var model = await _articleRepository.GetAsync(input.Id);
                if (model == null)
                    return "";
                return new
                {
                    NavId = model.NavigationMenuId,
                    Nav = model.NavigationMenu.Name,
                    Title = model.Title,
                    Picture = model.Picture,
                    Content = model.Content,
                    Source = model.Source,
                    keywords = model.keywords,
                    Author = model.Author,
                    Date = model.PublishTime.ToString("yyyy-MM-dd")
                };
            }
        }

        private string ReplaceHtmlTag(string html, int length = 0)
        {
            string strText = System.Text.RegularExpressions.Regex.Replace(html, "<[^>]+>", "");
            strText = System.Text.RegularExpressions.Regex.Replace(strText, "&[^;]+;", "");

            if (length > 0 && strText.Length > length)
                return strText.Substring(0, length);

            return strText;
        }
    }
}
