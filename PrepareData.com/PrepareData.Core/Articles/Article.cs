using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using PrepareData.NavigationMenus;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrepareData.Articles
{

    [Table("Articles")]
    public class Article : FullAuditedEntity<int>,IMayHaveTenant
    {
        public virtual int? TenantId { get; set; } //
        [StringLength(100)]
        public virtual string Title { get; set; }
        //文章标题
        [StringLength(200)]
        public virtual string Introduce { get; set; }
        //简介
        public virtual string Content { get; set; }
        //内容
        public virtual string Picture { get; set; }
        //图片
        [StringLength(50)]
        public virtual string Source { get; set; }
        //来源
        [StringLength(32)]
        public virtual string keywords { get; set; }
        //关键词
        [StringLength(32)]
        public virtual string Author { get; set; }
        //作者
        [StringLength(10)]
        public virtual string IstoWeb { get; set; }
        //是否推送到主站：是，否
        public virtual DateTime PublishTime { get; set; }
        //发表时间
        [StringLength(10)]
        public virtual string IstoNotice { get; set; }
        //是否是否推到通知：是，否
        public virtual bool IsTop { get; set; }
        //是否置顶:是，否
        public virtual bool IsCheck { get; set; }
        //审核：通过，未通过
        [ForeignKey("NavigationMenuId")]
        public virtual NavigationMenu NavigationMenu { get; set; }

        public virtual int? NavigationMenuId { get; set; }
    }
}