using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;

namespace PrepareData.Web.Controllers
{
    [AbpMvcAuthorize]
    public class HomeController : PrepareDataControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
	}
}