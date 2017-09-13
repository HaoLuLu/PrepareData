using Abp.Application.Services;
using Abp.Application.Services.Dto;
using PrepareData.Articles.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PrepareData.Articles
{

    public interface IArticleAppService : IApplicationService
    {
        int CreateArticleAndGetId(ArticleDto input);
        Task Update(ArticleDto input);
        Task<ArticleDto> GetDetail(int Id);
        Task Cancel(int Id);
        Task<ArticlePageListOutput> GetPageList(ArticlePageListInput input);
        Task<List<ArticleListDto>> GetList(ArticleListInput input);
        /// <summary>
        /// 多页信息
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        Task<dynamic> GetArticlePage(EntityRequestInput<int> input, int? tenantId);
        /// <summary>
        /// 提供给首页的多页列表信息
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        Task<dynamic> GetHomeArticleList(EntityRequestInput<int> input, int? tenantId);
        Task<dynamic> GetHomeArticleList(EntityRequestInput<string> input, int? tenantId);
    }
}
