using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System.ComponentModel.DataAnnotations;

namespace PrepareData.TenantGroups.Dtos
{
    [AutoMapFrom(typeof(TenantGroup))]
    public class CreateTenantGroupInput:AuditedEntityDto<int>
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        //名称
        [StringLength(10)]
        public string OrderBy { get; set; }
        //排序
        public bool IsActive { get; set; }
        //是否有效
        [StringLength(100)]
        public string EnglishName { get; set; }

    }
}
