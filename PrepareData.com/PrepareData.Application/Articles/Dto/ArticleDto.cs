using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using PrepareData.NavigationMenus;
using System;

namespace PrepareData.Articles.Dto
{

    [AutoMapTo(typeof(Article))]
    public class ArticleDto : CreationAuditedEntityDto<int>
    {
        public  string Title { get; set; }
        public  string Introduce { get; set; }
        //文章标题
        //简介
        public  string Content { get; set; }
        //内容
        public  string Picture { get; set; }
        //图片
        public  string Source { get; set; }
        //来源
        public  string keywords { get; set; }
        //关键词
        public  string Author { get; set; }
        //作者
        public  string IstoWeb { get; set; }
        //是否推送到主站：是，否
        public  string IstoNotice { get; set; }
        //是否是否推到通知：是，否
        public  bool IsTop { get; set; }
        //是否置顶:是，否
        public bool IsCheck { get; set; }
        //审核：通过，未通过
        public DateTime PublishTime { get; set; }
        //发表时间
        public virtual NavigationMenu NavigationMenu { get; set; }

        public virtual int? NavigationMenuId { get; set; }
    }
}
