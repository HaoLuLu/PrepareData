using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PrepareData.TenantGroups
{
    [Table("TenantGroup")]
    public class TenantGroup : AuditedEntity<int>
    {
        [StringLength(100)]
        public virtual string Name { get; set; }
        //名称
        [StringLength(10)]
        public virtual string OrderBy { get; set; }
        //排序
        public virtual bool IsActive { get; set; }
        //是否有效
        [StringLength(100)]
        public virtual string EnglishName { get; set; }
        //英文名
    }
}
