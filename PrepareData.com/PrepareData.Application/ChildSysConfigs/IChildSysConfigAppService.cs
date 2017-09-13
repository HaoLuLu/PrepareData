using Abp.Application.Services;
using PrepareData.ChildSysConfigs.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PrepareData.ChildSysConfigs
{
    public interface IChildSysConfigAppService : IApplicationService
    {
        Task<List<ChildSysConfig>> GetAllList();
        Task Update(UpdateInput input);
        Task<List<ChildSysConfig>> GetShowConfigs(int? tenantId);
    }
}
