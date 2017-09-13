using System.Threading.Tasks;
using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using PrepareData.Authorization;
using PrepareData.Users;
using Abp.Web.Models;
using PrepareData.Users.Dto;

namespace PrepareData.Web.Controllers
{
    [AbpMvcAuthorize(PermissionNames.Pages_Users)]
    public class UsersController : PrepareDataControllerBase
    {
        private readonly IUserAppService _userAppService;

        public UsersController(IUserAppService userAppService)
        {
            _userAppService = userAppService;
        }

        public ActionResult Index()
        {
            return View();
        }

        [DontWrapResult]
        [HttpPost]
        public async Task<JsonResult> List(string Name, int draw, int start, int length)
        {
            var request = new UserPageListInput { start = start, length = length, draw = draw, Name = Name };
            var result = await _userAppService.GetPageList(request);
            return Json(new
            {
                draw = result.draw,
                recordsTotal = result.recordsTotal,
                recordsFiltered = result.recordsFiltered,
                data = result.data
            }, JsonRequestBehavior.AllowGet);
        }

        [DontWrapResult]
        [HttpPost]
        public async Task<JsonResult> List1(string Name, int draw, int start, int length)
        {
            var request = new UserPageListInput { start = start, length = length, draw = draw, Name = Name };
            var result = await _userAppService.GetPageList1(request);
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