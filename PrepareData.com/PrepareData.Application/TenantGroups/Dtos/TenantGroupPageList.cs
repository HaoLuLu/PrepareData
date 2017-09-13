using System.Collections.Generic;

namespace PrepareData.TenantGroups.Dtos
{
    public class TenantGroupPageList
    {
        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<TenantGroupDto> data { get; set; }
    }
}
