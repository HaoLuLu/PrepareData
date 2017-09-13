using Abp.Web.Models;
using PrepareData.NavigationMenus;
using PrepareData.NavigationMenus.Dtos;
using PrepareData.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace PrepareData.Web.Controllers
{
    public class NavigationMenusController : PrepareDataControllerBase
    {
        private readonly INavigationMenuAppService _appService;

        public NavigationMenusController(INavigationMenuAppService appService)
        {
            _appService = appService;
        }

        public ActionResult Index()
        {
            return View();
        }

        [DontWrapResult]
        [HttpPost]
        public async Task<JsonResult> List(string Name, int draw, int start, int length, int? parentId)
        {
            var request = new NavigationMenuPageListInput { start = start, length = length, draw = draw, Name = Name, ParentId = (parentId == -1 ? null : parentId) };
            var result = await _appService.GetPageList(request);
            return Json(new
            {
                draw = result.draw,
                recordsTotal = result.recordsTotal,
                recordsFiltered = result.recordsFiltered,
                data = result.data
            }, JsonRequestBehavior.AllowGet);
        }

        private List<TreeModel> GetTypeTrees(int? parentId, bool? isActive,int? type)
        {
            NavigationMenuDto nav = new NavigationMenuDto()
            {
                ParentId = parentId,
                TenantId = AbpSession.TenantId,
                
            };
            if (isActive.HasValue)
            {
                nav.IsActive = isActive.Value;
            }
            if (type.HasValue)
            {
                nav.Type = type.Value;
            }

            var output = _appService.GetListTree(nav);
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
                    Children = GetTypeTrees(root.Id, isActive, type)
                });
            }
            return list;
        }


        public JsonResult Tree(bool? isActive, int? type)
        {
            return Json(new
            {
                id = -1,
                text = "导航栏目",
                type = "root",
                state = new
                {
                    opened = true
                },
                children = GetTypeTrees(null,isActive, type)
            });
        }

    }
}