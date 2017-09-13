using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mdevccom.MultiTenancy.Dto
{
    public class TenantPageListOutput
    {
        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<TenantGetListDto> data { get; set; }
    }
}
