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
        public string Contact { get; set; } //��ϵ��
        [StringLength(30)]
        public string ContactTel { get; set; }//��ϵ�绰
        [StringLength(50)]
        public string E_Mail { get; set; }//����
        [StringLength(200)]
        public string Address { get; set; } //��ϸ��ַ

        public DateTime AuthorizedEndTime { get; set; }//��Ȩ��ֹʱ��

        public bool IsHot { get; set; } //�Ƽ�������ҳ

        public int? TenantType { get; set; }//����

        public string Picture { get; set; } //����ҳlogo

        public int? TenantGroupId { get; set; }//������id

        public int? OrderBy { get; set; } //����
    }
}