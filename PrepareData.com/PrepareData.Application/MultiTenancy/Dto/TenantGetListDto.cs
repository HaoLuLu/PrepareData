using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using PrepareData.TenantGroups;
using System;

namespace PrepareData.MultiTenancy.Dto
{
    [AutoMapFrom(typeof(Tenant))]
    public class TenantGetListDto : EntityDto<int>
    {
        public TenantGetListDto()
        {
            TenantGroup = new TenantGroup();
        }
        public string TenancyName { get; set; }

        public string Name { get; set; }

        public string TenantNo { get; set; }

        public string ConnectionString { get; set; }

        public bool IsActive { get; set; }

        public string Contact { get; set; } //联系人

        public string ContactTel { get; set; }//联系电话

        public string E_Mail { get; set; }//邮箱

        public string Address { get; set; } //详细地址

        public DateTime AuthorizedEndTime { get; set; }//授权截止时间

        public bool IsHot { get; set; } //推荐到汇总页

        public TenantGroup TenantGroup { get; set; }

        public int? TenantGroupId { get; set; }//类型

        public string Picture { get; set; } //图片

        public int? OrderBy { get; set; } //排序
    }
}
