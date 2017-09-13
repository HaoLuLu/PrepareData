using Abp.Application.Services.Dto;

namespace PrepareData.FriendLinks.Dto
{
    public class UploadFilePathInput : EntityDto<int>
    {
        public string FilePath { get; set; }

    }
}
