using Abp.Application.Services.Dto;
using Abp.AutoMapper;

namespace PrepareData.Users.Dto
{

    [AutoMap(typeof(User))]
    public class ChangePwdDto : EntityDto<int>
    {

        public string Password { get; set; }

     

        public string OldPassword { get; set; }

    }
}