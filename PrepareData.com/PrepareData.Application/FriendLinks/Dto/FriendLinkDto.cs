using Abp.Application.Services.Dto;
using Abp.AutoMapper;

namespace PrepareData.FriendLinks.Dto
{
    [AutoMapTo(typeof(FriendLink))]
   public class FriendLinkDto : EntityDto<int>
    {

        public string Name { get; set; }
        public string Url { get; set; }
        public  string OrderBy { get; set; }
        //排序
        public  string Picture { get; set; }

        public int Type { get; set; }

    }
}
