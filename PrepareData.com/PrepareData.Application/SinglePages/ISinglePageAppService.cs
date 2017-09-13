using Abp.Application.Services;
using Abp.Application.Services.Dto;
using PrepareData.SinglePages.Dto;
using System.Threading.Tasks;

namespace PrepareData.SinglePages
{
    public interface ISinglePageAppService : IApplicationService
    {
        int CreateSinglePageAndGetId(SinglePageDto input);
        Task Update(SinglePageDto input);
        Task<SinglePageDto> GetDetail(int Id);
        Task Cancel(int Id);
        Task<SinglePageListOutput> GetPageList(SinglePageListInput input);
        /// <summary>
        /// 提供给首页的单页信息
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        Task<dynamic> GetHomeSigeInfo(EntityRequestInput<int> input, int? tenantId);
        Task<dynamic> GetSigePageInfo(EntityRequestInput<int> input, int? tenantId);

    }
}
