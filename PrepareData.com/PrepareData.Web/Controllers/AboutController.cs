using System.Web.Mvc;

namespace PrepareData.Web.Controllers
{
    public class AboutController : PrepareDataControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}