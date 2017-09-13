using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrepareData.ChildSysConfigs
{
    /// <summary>
    /// 子网站系统配置
    /// </summary>
    [Table("ChildSysConfigs")]
    public class ChildSysConfig : AuditedEntity<int>,IMayHaveTenant
    {
        public virtual int? TenantId { get; set; }

        /// <summary>
        /// 配置名称
        /// </summary>
        [StringLength(64)]
        public string Name { get; set; }

        /// <summary>
        /// 显示名称
        /// </summary>
        [StringLength(64)]
        public string DisplayName { get; set; }
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
        [StringLength(256)]
        public string Text { get; set; }
        /// <summary>
        /// 富文本值
        /// </summary>
        public string Content { get; set; }
        /// <summary>
        /// 链接地址
        /// </summary>
        [StringLength(256)]
        public string Url { get; set; }
    }

    public enum EnumConfigType
    {
        /// <summary>
        /// 文本
        /// </summary>
        Text=1,
        /// <summary>
        /// 图片
        /// </summary>
        Img = 2,
        /// <summary>
        /// 单选
        /// </summary>
        Radio = 3,
        /// <summary>
        /// 多选
        /// </summary>
        Checkbox = 4,
        /// <summary>
        /// 富文本
        /// </summary>
        Textarea =5,
        /// <summary>
        /// 多行
        /// </summary>
        Multiline = 6,
    }
}