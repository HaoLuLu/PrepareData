using Abp.WebApi.Controllers;
using PrepareData.MultiTenancy;
using PrepareData.TenantGroups;

namespace PrepareData.Api.Controllers
{
    public class TenantGroupsController : AbpApiController
    {
        private readonly ITenantGroupAppService _groupsAppService;
        private readonly ITenantAppService _tenantAppService;

        public TenantGroupsController(ITenantGroupAppService groupsAppService,
            ITenantAppService tenantAppService)
        {
            _groupsAppService = groupsAppService;
            _tenantAppService = tenantAppService;
        }


        //public async Task<ActionResult> TenantGroups(EntityRequestInput<int> id)
        //{
        //    var output = await _groupsAppService.GetTenantGroupsInfo(id);
        //    return View(output);
        //}

    }
}
