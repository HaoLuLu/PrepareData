using Abp.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrepareData.Articles
{
  
    public interface IArticleManager : IDomainService
    {
        int InsertArticle(Article @article);

    }
}
