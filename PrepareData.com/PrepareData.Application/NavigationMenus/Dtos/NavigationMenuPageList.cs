using System.Collections.Generic;

namespace PrepareData.NavigationMenus.Dtos
{
    public class NavigationMenuPageList
    {
        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<NavigationMenuDto> data { get; set; }
    }
}
