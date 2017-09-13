using Abp.Application.Services.Dto;
using Abp.AutoMapper;

namespace PrepareData.NavigationMenus.Dtos
{
    [AutoMapTo(typeof(NavigationMenu))]
    public class NavigationMenuDto : AuditedEntityDto<int>
    {
        public virtual int? TenantId { get; set; }

        public virtual string Name { get; set; }
        //名称

        public virtual string OrderBy { get; set; }
        //排序
        public virtual bool IsActive { get; set; }
        //是否有效
        public virtual int? Type { get; set; }


        public virtual NavigationMenuDto Parent { get; set; }

        public virtual int? ParentId { get; set; }

    }

}
