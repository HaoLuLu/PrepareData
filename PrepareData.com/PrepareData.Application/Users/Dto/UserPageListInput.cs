namespace PrepareData.Users.Dto
{
    public class UserPageListInput
    {
        public int draw { get; set; }
        public int start { get; set; }
        public int length { get; set; }
        public string Name { get; set; }
    }
}
