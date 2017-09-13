using System.Collections.Generic;

namespace PrepareData.MultiTenancy.Dto
{
    public class TenantPageListOutput
    {
        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<TenantGetListDto> data { get; set; }
    }
}
