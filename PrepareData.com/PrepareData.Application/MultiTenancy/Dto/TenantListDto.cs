using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;

namespace PrepareData.MultiTenancy.Dto
{
    [AutoMapFrom(typeof(Tenant))]
    public class TenantListDto : EntityDto
    {
        public string TenancyName { get; set; }

        public string Name { get; set; }

        public string Contact { get; set; } //��ϵ��

        public string ContactTel { get; set; }//��ϵ�绰

        public string E_Mail { get; set; }//����

        public string Address { get; set; } //��ϸ��ַ

        public DateTime AuthorizedEndTime { get; set; }//��Ȩ��ֹʱ��

        public bool IsHot { get; set; } //�Ƽ�������ҳ

        public int? TenantType { get; set; }//����
    }
}