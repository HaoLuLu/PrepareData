using Abp.Application.Services.Dto;

namespace PrepareData.MultiTenancy.Dto
{
    public class TenantInfoDto : EntityDto
    {
        public string Name { get; set; }

        public string Template { get; set; }

        public string Picture { get; set; }
    }
}
