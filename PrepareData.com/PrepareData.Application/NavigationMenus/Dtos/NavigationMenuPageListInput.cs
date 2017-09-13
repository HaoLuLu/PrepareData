

namespace PrepareData.NavigationMenus.Dtos
{
    public class NavigationMenuPageListInput
    {
        public int draw { get; set; }
        public int start { get; set; }
        public int length { get; set; }
        public string Name { get; set; }
        public int? ParentId { get; set; }
    }
}
