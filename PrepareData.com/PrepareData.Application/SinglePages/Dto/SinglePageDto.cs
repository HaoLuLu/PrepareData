using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using PrepareData.NavigationMenus.Dtos;
using System;

namespace PrepareData.SinglePages.Dto
{

    [AutoMapTo(typeof(SinglePage))]
    public class SinglePageDto : EntityDto<int>
    {

        public  string Title { get; set; }
        //标题
        public  string Introduce { get; set; }
        //简介
        public  string Content { get; set; }
        //内容
        public  string Picture { get; set; }
        //图片
        public  string IsPublish { get; set; }
        //是否发表
        public  DateTime PublishTime { get; set; }
        //发表时间
        public virtual NavigationMenuDto NavigationMenu { get; set; }

        public virtual int? NavigationMenuId { get; set; }
    }
}
