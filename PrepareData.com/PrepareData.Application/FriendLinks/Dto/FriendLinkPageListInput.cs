namespace PrepareData.FriendLinks.Dto
{
    public class FriendLinkPageListInput
    {

        public int draw { get; set; }
        public int start { get; set; }
        public int length { get; set; }
        public string Name { get; set; }
        public int Type { get; set; }
    }
}
