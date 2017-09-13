using Abp.Application.Services.Dto;

namespace PrepareData.TenantGroups.Dtos
{
    public class SelectOutput : EntityDto<int>
    {
        public string Text { get; set; }
    }
}
