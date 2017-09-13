using Abp.Application.Services.Dto;
using Abp.AutoMapper;

namespace PrepareData.TenantGroups.Dtos
{
    [AutoMapFrom(typeof(TenantGroup))]
    public class TenantGroupDto : AuditedEntityDto<int>
    {
        public string Name { get; set; }
        //名称
        public string OrderBy { get; set; }
        //排序
        public bool IsActive { get; set; }
        //是否有效
        public string EnglishName { get; set; }
        
    }
}
