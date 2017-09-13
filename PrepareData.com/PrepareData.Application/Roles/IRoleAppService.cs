using System.Threading.Tasks;
using Abp.Application.Services;
using PrepareData.Roles.Dto;

namespace PrepareData.Roles
{
    public interface IRoleAppService : IApplicationService
    {
        Task UpdateRolePermissions(UpdateRolePermissionsInput input);
    }
}
