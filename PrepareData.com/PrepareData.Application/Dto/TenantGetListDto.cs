using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mdevccom.MultiTenancy.Dto
{
    [AutoMapFrom(typeof(Tenant))]
    public class TenantGetListDto : EntityDto<int>
    {
        public string TenancyName { get; set; }

        public string Name { get; set; }

        public string TenantNo { get; set; }

        public string ConnectionString { get; set; }

        public string IsActive { get; set; }
    }
}
