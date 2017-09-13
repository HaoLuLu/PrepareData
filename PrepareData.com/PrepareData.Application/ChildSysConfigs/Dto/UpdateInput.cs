using Abp.Application.Services.Dto;

namespace PrepareData.ChildSysConfigs.Dto
{
    public class UpdateInput : EntityDto<int>
    {
        /// <summary>
        /// 配置类型
        /// </summary>
        public EnumConfigType Type { get; set; }

        /// <summary>
        /// 是否显示
        /// </summary>
        public bool IsShow { get; set; }
        /// <summary>
        /// 单选值
        /// </summary>
        public int? Value { get; set; }
        /// <summary>
        /// 文本/图片/多选 值
        /// </summary>
        public string Text { get; set; }
        /// <summary>
        /// 富文本值
        /// </summary>
        public string Content { get; set; }
        /// <summary>
        /// 链接地址
        /// </summary>
        public string Url { get; set; }

        public string[] Checks { get; set; }
    }
}
