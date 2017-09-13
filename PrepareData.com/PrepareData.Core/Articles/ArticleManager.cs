using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrepareData.Articles
{
 
    public class ArticleManager : IArticleManager
    {

        private readonly IRepository<Article, int> _articleRepository;

        public ArticleManager(IRepository<Article, int> articleRepository)
        {
            _articleRepository = articleRepository;
        }
        public int InsertArticle(Article @article)
        {
            return _articleRepository.InsertAndGetId(@article);
        }


    }
}
