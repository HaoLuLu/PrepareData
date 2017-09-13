using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using PrepareData.NavigationMenus;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PrepareData.SinglePages
{
    [Table("SinglePages")]
    public class SinglePage : FullAuditedEntity<int>,IMayHaveTenant
    {
        public virtual int? TenantId { get; set; } //
        [StringLength(200)]
        public virtual string Title { get; set; }
        //标题
        [StringLength(400)]
        public virtual string Introduce { get; set; }
        //简介
        public virtual string Content { get; set; }
        //内容
        public virtual string Picture { get; set; }
        //图片
        [StringLength(20)]
        public virtual string IsPublish { get; set; }
        //是否发表：0否，1是
        public virtual DateTime PublishTime { get; set; }
        //发表时间
        [ForeignKey("NavigationMenuId")]
        public virtual NavigationMenu NavigationMenu { get; set; }

        public virtual int? NavigationMenuId { get; set; }
    }
}
