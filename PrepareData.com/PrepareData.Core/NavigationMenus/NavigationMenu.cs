using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PrepareData.NavigationMenus
{
    [Table("NavigationMenu")]
    public class NavigationMenu : AuditedEntity<int>, IMayHaveTenant
    {
        public virtual int? TenantId { get; set; }
        [StringLength(100)]
        public virtual string Name { get; set; }
        //名称
        [StringLength(10)]
        public virtual string OrderBy { get; set; }
        //排序
        public virtual bool IsActive { get; set; }
        //是否有效

        /// <summary>
        /// 2 单页 1 文章
        /// </summary>
        public virtual int Type { get; set; }

        [ForeignKey("ParentId")]
        public virtual NavigationMenu Parent { get; set; }

        public virtual int? ParentId { get; set; }

    }
}
