using System.Collections.Generic;

namespace PrepareData.Articles.Dto
{

    public class ArticlePageListOutput
    {
        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<ArticleListDto> data { get; set; }
    }

}
