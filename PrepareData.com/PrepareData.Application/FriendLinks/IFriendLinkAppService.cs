using Abp.Application.Services;
using Abp.Application.Services.Dto;
using PrepareData.FriendLinks.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PrepareData.FriendLinks
{
    public interface IFriendLinkAppService: IApplicationService
    {
        Task<FriendLinkPageListOutput> GetPageList(FriendLinkPageListInput input);
        Task<FriendLinkDto> GetDetail(EntityRequestInput<int> input);
        Task Update(FriendLinkDto input);
        int CreateFriendLinkAndGetId(FriendLinkDto input);
        //Task UploadFilePath(UploadFilePathInput input);
        Task Cancel(int Id);
        Task<List<FriendLinkInfoDto>> GetHomeLinks(EntityRequestInput<int> input, int? tenantId, int type = -1);
    }
}
