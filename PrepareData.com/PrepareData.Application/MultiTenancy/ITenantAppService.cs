using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using PrepareData.MultiTenancy.Dto;
using System.Collections.Generic;

namespace PrepareData.MultiTenancy
{
    public interface ITenantAppService : IApplicationService
    {
        ListResultOutput<TenantListDto> GetTenants();

        Task CreateTenant(CreateTenantInput input);
        Task<TenantGetListDto> GetDetail(EntityRequestInput<int> input);
        Task Cancel(int id);
        Task Update(UpdateTenantInput input);
        Task<TenantPageListOutput> GetPageList(TenantPageListInput input);

        Task<List<TenantInfoDto>> GetTenantsInfo(EntityRequestInput<int> input);
    }
}
