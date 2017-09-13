using System.Collections.Generic;

namespace PrepareData.Users.Dto
{
    public class UserPageListOutput
    {
        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<UserListDto> data { get; set; }
    }
}
