using Abp.Application.Services.Dto;

namespace PrepareData.FriendLinks.Dto
{
    public class FriendLinkInfoDto : EntityDto
    {
        public string Name { get; set; }

        public string Url { get; set; }

        public string Picture { get; set; }
    }
}
