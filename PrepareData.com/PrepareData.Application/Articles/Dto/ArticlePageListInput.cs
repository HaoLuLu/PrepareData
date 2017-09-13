namespace PrepareData.Articles.Dto
{
    public class ArticlePageListInput
    {

        public int draw { get; set; }
        public int start { get; set; }
        public int length { get; set; }
        public string Title { get; set; }
    }
}
