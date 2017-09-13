using Abp.MultiTenancy;
using PrepareData.TenantGroups;
using PrepareData.Users;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PrepareData.MultiTenancy
{
    public class Tenant : AbpTenant<User>
    {
        public Tenant()
        {
            
        }

        public Tenant(string tenancyName, string name)
            : base(tenancyName, name)
        {
        }
        [StringLength(50)]
        public virtual string Contact { get; set; } //联系人
        [StringLength(30)]
        public virtual string ContactTel { get; set; }//联系电话
        [StringLength(50)]
        public virtual string E_Mail { get; set; }//邮箱
        [StringLength(200)]
        public virtual string Address { get; set; } //详细地址

        public virtual DateTime AuthorizedEndTime { get; set; }//授权截止时间
        
        public virtual bool IsHot { get; set; } //推荐到汇总页

        [ForeignKey("TenantGroupId")]
        public virtual TenantGroup TenantGroup { get; set; }
        
        public virtual int? TenantGroupId { get; set; }//类型

        [StringLength(500)]
        public virtual string Picture { get; set; }  //图片

        public virtual int? OrderBy { get; set; }  //排序
    }
}