using System.Collections.Generic;

namespace PrepareData.FriendLinks.Dto
{
    public class FriendLinkPageListOutput
    {
        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<FriendLinkDto> data { get; set; }
    }
}
