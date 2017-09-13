using Abp.Application.Navigation;
using Abp.Localization;
using PrepareData.Authorization;

namespace PrepareData.Web
{
    /// <summary>
    /// This class defines menus for the application.
    /// It uses ABP's menu system.
    /// When you add menu items here, they are automatically appear in angular application.
    /// See Views/Layout/_TopMenu.cshtml file to know how to render menu.
    /// </summary>
    public class PrepareDataNavigationProvider : NavigationProvider
    {
        public override void SetNavigation(INavigationProviderContext context)
        {
            context.Manager.MainMenu
                .AddItem(
                    new MenuItemDefinition(
                        "Home",
                        L("HomePage"),
                        url: "",
                        icon: "fa fa-home",
                        requiresAuthentication: true
                        )
                ).AddItem(
                    new MenuItemDefinition(
                        "ChildSysConfigs",
                        L("ChildSysConfigs"),
                        url: "ChildSysConfigs",
                        icon: "fa fa-cog",
                        requiresAuthentication: true
                        )
                ).AddItem(
                    new MenuItemDefinition(
                        "NavigationMenus",
                        L("NavigationMenus"),
                        url: "NavigationMenus/Index",
                        icon: "fa fa-bars"
                        )
                ).AddItem(
                    new MenuItemDefinition(
                        "Sliders",
                        L("Sliders"),
                        url: "FriendLinks/Sliders",
                        icon: "fa fa-bars"
                        )
                ).AddItem(
                    new MenuItemDefinition(
                        "FriendLinks",
                        L("FriendLink"),
                        url: "FriendLinks/Index",
                        icon: "fa fa-chain"
                        )
                ).AddItem(
                    new MenuItemDefinition(
                        "SinglePages",
                        L("SinglePage"),
                        url: "SinglePages/SinglePageIndex",
                        icon: "fa fa-bookmark-o"
                        )
                ).AddItem(
                    new MenuItemDefinition(
                        "Articles",
                        L("Article"),
                        url: "Articles/ArticleIndex",
                        icon: "fa fa-bookmark-o"
                        )
                ).AddItem(
                    new MenuItemDefinition(
                        "AuthManage",
                        L("AuthManage"),
                        icon: "fa fa-gears",
                        requiredPermissionName: PermissionNames.Pages_Users
                        ).AddItem(
                        new MenuItemDefinition(
                            "TenantGroups",
                            L("TenantGroups"),
                            url: "TenantGroups",
                            icon: "fa  fa-group",
                            requiredPermissionName: PermissionNames.Pages_Tenants
                            )
                        ).AddItem(
                        new MenuItemDefinition(
                            "Tenants",
                            L("Tenants"),
                            url: "Tenants",
                            icon: "fa fa-globe",
                            requiredPermissionName: PermissionNames.Pages_Tenants
                            )
                        ).AddItem(
                            new MenuItemDefinition(
                                "Users",
                                L("Users"),
                                url: "Users",
                                icon: "fa fa-users",
                                requiredPermissionName: PermissionNames.Pages_Users
                                )
                        )
                ).AddItem(
                    new MenuItemDefinition(
                        "About",
                        L("About"),
                        url: "About",
                        icon: "fa fa-info"
                        )
                );
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, PrepareDataConsts.LocalizationSourceName);
        }
    }
}
