using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using PrepareData.Users.Dto;

namespace PrepareData.Users
{
    public interface IUserAppService : IApplicationService
    {
        Task ProhibitPermission(ProhibitPermissionInput input);

        Task RemoveFromRole(long userId, string roleName);

        Task<ListResultOutput<UserListDto>> GetUsers();

        Task CreateUser(CreateUserInput input);

        Task<UserPageListOutput> GetPageList(UserPageListInput input);
        Task<UserPageListOutput> GetPageList1(UserPageListInput input);

        Task<UserListDto> GetDetail(EntityRequestInput<int> input);

        Task Update(CreateUserInput input);

        Task Cancel(int id);
        Task ChangPwd(ChangePwdDto input);
        Task<User> GetCurrentUser();
    }
}