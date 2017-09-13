using Abp.Application.Services.Dto;
using Abp.MultiTenancy;
using PrepareData.Users;
using System;
using System.ComponentModel.DataAnnotations;

namespace PrepareData.MultiTenancy.Dto
{
    public class UpdateTenantInput : EntityDto<int>
    {
        [Required]
        [StringLength(AbpTenantBase.MaxTenancyNameLength)]
        public string TenancyName { get; set; }

        [Required]
        [StringLength(Tenant.MaxNameLength)]
        public string Name { get; set; }

        [StringLength(User.MaxEmailAddressLength)]
        public string AdminEmailAddress { get; set; }

        [MaxLength(AbpTenantBase.MaxConnectionStringLength)]
        public string ConnectionString { get; set; }

        [StringLength(Tenant.MaxNameLength)]
        public string Contact { get; set; } //联系人

        public string ContactTel { get; set; }//联系电话

        [StringLength(User.MaxEmailAddressLength)]
        public string E_Mail { get; set; }//邮箱

        public string Address { get; set; } //详细地址

        public DateTime AuthorizedEndTime { get; set; }//授权截止时间

        public bool IsHot { get; set; } //推荐到汇总页

        public int? TenantGroupId { get; set; }//类型

        public string Picture { get; set; } //图片

        public int? OrderBy { get; set; } //排序

    }
}
