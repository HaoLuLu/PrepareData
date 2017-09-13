using System.Collections.Generic;

namespace PrepareData.SinglePages.Dto
{

    public class SinglePageListOutput
    {
        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<SinglePageDto> data { get; set; }
    }
}
