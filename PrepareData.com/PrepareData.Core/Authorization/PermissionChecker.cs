using Abp.Authorization;
using PrepareData.Authorization.Roles;
using PrepareData.MultiTenancy;
using PrepareData.Users;

namespace PrepareData.Authorization
{
    public class PermissionChecker : PermissionChecker<Tenant, Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {

        }
    }
}
