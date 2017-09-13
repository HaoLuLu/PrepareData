namespace PrepareData.SinglePages.Dto
{

    public class SinglePageListInput
    {

        public int draw { get; set; }
        public int start { get; set; }
        public int length { get; set; }
        public string Title { get; set; }
    }
}
