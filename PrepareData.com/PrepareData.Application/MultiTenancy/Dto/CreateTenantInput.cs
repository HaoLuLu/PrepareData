using System.ComponentModel.DataAnnotations;
using Abp.AutoMapper;
using Abp.MultiTenancy;
using PrepareData.Users;
using System;

namespace PrepareData.MultiTenancy.Dto
{
    [AutoMapTo(typeof(Tenant))]
    public class CreateTenantInput
    {
        [Required]
        [StringLength(AbpTenantBase.MaxTenancyNameLength)]
        [RegularExpression(Tenant.TenancyNameRegex)]
        public string TenancyName { get; set; }

        [Required]
        [StringLength(Tenant.MaxNameLength)]
        public string Name { get; set; }

        [Required]
        [StringLength(User.MaxEmailAddressLength)]
        public string AdminEmailAddress { get; set; }

        [MaxLength(AbpTenantBase.MaxConnectionStringLength)]
        public string ConnectionString { get; set; }

        [StringLength(50)]
        public string Contact { get; set; } //联系人
        [StringLength(30)]
        public string ContactTel { get; set; }//联系电话
        [StringLength(50)]
        public string E_Mail { get; set; }//邮箱
        [StringLength(200)]
        public string Address { get; set; } //详细地址

        public DateTime AuthorizedEndTime { get; set; }//授权截止时间

        public bool IsHot { get; set; } //推荐到汇总页

        public int? TenantType { get; set; }//类型

        public string Picture { get; set; } //汇总页logo

        public int? TenantGroupId { get; set; }//机构组id

        public int? OrderBy { get; set; } //排序
    }
}