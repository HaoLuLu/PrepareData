using PrepareData.Api.Models;
using Abp.WebApi.Controllers;
using PrepareData.NavigationMenus;
using System.Collections.Generic;
using PrepareData.NavigationMenus.Dtos;
using Abp.Web.Models;
using System.Web.Http;

namespace PrepareData.Api.Controllers
{
    public class NavigationMenusController : AbpApiController
    {
        private readonly INavigationMenuAppService _appService;

        public NavigationMenusController(INavigationMenuAppService appService)
        {
            _appService = appService;
        }
        
        [HttpGet]
        public AjaxResponse Tree(int? tenantId)
        {
            return new AjaxResponse(new
            {
                id = -1,
                text = "导航栏目",
                type = "root",
                state = new
                {
                    opened = true
                },
                children = GetTypeTrees(null, tenantId)
            });
        }

        private List<TreeModel> GetTypeTrees(int? parentId,int? tenantId)
        {
            var output = _appService.GetListTree(new NavigationMenuDto() { ParentId = parentId , IsActive =true, TenantId = tenantId });
            var list = new List<TreeModel>();
            if (output == null)
                return list;
            foreach (var root in output.Items)
            {
                list.Add(new TreeModel
                {
                    Id = root.Id,
                    Text = root.Name,
                    Type = root.Type.ToString(),
                    Children = GetTypeTrees(root.Id, tenantId)
                });
            }
            return list;
        }


    }
}
