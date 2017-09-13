using System.Data.Common;
using Abp.Zero.EntityFramework;
using PrepareData.Authorization.Roles;
using PrepareData.MultiTenancy;
using PrepareData.Users;
using PrepareData.FriendLinks;
using System.Data.Entity;
using PrepareData.SinglePages;
using PrepareData.Articles;
using PrepareData.NavigationMenus;
using PrepareData.ChildSysConfigs;
using PrepareData.TenantGroups;

namespace PrepareData.EntityFramework
{
    public class PrepareDataDbContext : AbpZeroDbContext<Tenant, Role, User>
    {
        /// <summary>
        /// 友情链接
        /// </summary>
        public virtual IDbSet<FriendLink> FriendLink { get; set; }
        /// <summary>
        /// 单页
        /// </summary>
        public virtual IDbSet<SinglePage> SinglePage { get; set; }
        /// <summary>
        /// 文章
        /// </summary>
        public virtual IDbSet<Article> Article { get; set; }
        /// <summary>
        /// 机构类型
        /// </summary>
        public virtual IDbSet<TenantGroup> TenantGroups { get; set; }
        /// <summary>
        /// 导航栏目
        /// </summary>
        public virtual IDbSet<NavigationMenu> NavigationMenu { get; set; }
        /// <summary>
        /// 子网站系统配置
        /// </summary>
        public virtual IDbSet<ChildSysConfig> ChildSysConfigs { get; set; }

        /* NOTE: 
         *   Setting "Default" to base class helps us when working migration commands on Package Manager Console.
         *   But it may cause problems when working Migrate.exe of EF. If you will apply migrations on command line, do not
         *   pass connection string name to base classes. ABP works either way.
         */
        public PrepareDataDbContext()
            : base("Default")
        {

        }

        /* NOTE:
         *   This constructor is used by ABP to pass connection string defined in PrepareDataDataModule.PreInitialize.
         *   Notice that, actually you will not directly create an instance of PrepareDataDbContext since ABP automatically handles it.
         */
        public PrepareDataDbContext(string nameOrConnectionString)
            : base(nameOrConnectionString)
        {

        }

        //This constructor is used in tests
        public PrepareDataDbContext(DbConnection connection)
            : base(connection, true)
        {

        }
      
    }
}
