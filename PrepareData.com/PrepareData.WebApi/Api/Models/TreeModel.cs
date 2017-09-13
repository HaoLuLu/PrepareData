using System.Collections.Generic;

namespace PrepareData.Api.Models
{
    public class TreeModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Type { get; set; }
        public List<TreeModel> Children { get; set; }
    }
}