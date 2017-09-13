using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PrepareData.Web.Models
{
    public class TreeModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Type { get; set; }
        public List<TreeModel> Children { get; set; }
    }
}