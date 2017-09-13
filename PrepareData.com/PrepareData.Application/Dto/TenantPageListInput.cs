using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mdevccom.MultiTenancy.Dto
{
    public class TenantPageListInput
    {
        public int draw { get; set; }
        public int start { get; set; }
        public int length { get; set; }
        public string Name { get; set; }
    }
}
