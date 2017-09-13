using Abp.Web.Models;
using PrepareData.TenantGroups;
using PrepareData.TenantGroups.Dtos;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace PrepareData.Web.Controllers
{
    public class TenantGroupsController: PrepareDataControllerBase
    {
        private readonly ITenantGroupAppService _TenantGroupAppService;

        public TenantGroupsController(ITenantGroupAppService TenantGroupAppService)
        {
            _TenantGroupAppService = TenantGroupAppService;
        }

        public ActionResult Index()
        {
            return View();
        }

        [DontWrapResult]
        [HttpPost]
        public async Task<JsonResult> List(string Name, int draw, int start, int length)
        {
            var request = new TenantGroupPageListInput { start = start, length = length, draw = draw, Name = Name };
            var result = await _TenantGroupAppService.GetPageList(request);
            return Json(new
            {
                draw = result.draw,
                recordsTotal = result.recordsTotal,
                recordsFiltered = result.recordsFiltered,
                data = result.data
            }, JsonRequestBehavior.AllowGet);
        }
    }
}