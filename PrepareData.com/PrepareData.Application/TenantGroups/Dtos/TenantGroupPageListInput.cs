namespace PrepareData.TenantGroups.Dtos
{
    public class TenantGroupPageListInput
    {
        public int draw { get; set; }
        public int start { get; set; }
        public int length { get; set; }
        public string Name { get; set; }
    }
}
