using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrepareData.FriendLinks

{
    [Table("FriendLinks")]
    public class FriendLink : AuditedEntity<int>,IMayHaveTenant
    {
       
        public virtual int? TenantId { get; set; }
        [StringLength(32)]
        public virtual string Name { get; set; }
        //友情链接名称
        [StringLength(50)]
        public virtual string Url { get; set; }
        //友情链接地址
        [StringLength(20)]
        public virtual string OrderBy { get; set; }
        //排序
        [StringLength(5000)]
        public virtual string Picture { get; set; }
        // 0 友情链接 1 首页轮播图
        public virtual int Type { get; set; }
    }
}