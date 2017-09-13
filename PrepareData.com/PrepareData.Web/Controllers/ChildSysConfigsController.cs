using Abp.Threading;
using PrepareData.ChildSysConfigs;
using PrepareData.NavigationMenus;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace PrepareData.Web.Controllers
{
    public class ChildSysConfigsController : PrepareDataControllerBase
    {
        private readonly string uploadsFolder = "Uploads";

        private readonly IChildSysConfigAppService _appService;
        private readonly INavigationMenuAppService _navigationMenuAppService;

        public ChildSysConfigsController(IChildSysConfigAppService appService, INavigationMenuAppService navigationMenuAppService)
        {
            _appService = appService;
            _navigationMenuAppService = navigationMenuAppService;
        }

        public ActionResult Index()
        {
            var list=AsyncHelper.RunSync(()=>_appService.GetAllList());
            ViewBag.SigeList = AsyncHelper.RunSync(() => _navigationMenuAppService.GetSelectList());
            ViewBag.ArticleList = AsyncHelper.RunSync(() => _navigationMenuAppService.GetSelectList(1));
            return View(list);
        }
        //图片上传
        [HttpPost]
        public JsonResult UploadImg(HttpPostedFileBase file, string id, string name, string type, DateTime lastModifiedDate, int size)
        {
            DateTime timeNow = DateTime.Now;
            string year = timeNow.Year.ToString();
            string month = timeNow.Month.ToString();
            string day = timeNow.Day.ToString();
            var path = string.Format("\\{0}\\{1}\\", uploadsFolder, "ChildSysConfigs");
            string uploadPath = Server.MapPath(path);
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            var fileName = GetFileM5(file.InputStream) + file.FileName.Substring(file.FileName.LastIndexOf('.'));
            file.SaveAs(uploadPath + "\\" + fileName);
            return Json(path + "\\" + fileName);


        }

        private string GetFileM5(Stream input)
        {
            using (var md5 = MD5.Create())
            {
                var hashBytes = md5.ComputeHash(input);
                var sb = new StringBuilder();
                foreach (var hashByte in hashBytes)
                {
                    sb.Append(hashByte.ToString("X2"));
                }
                return sb.ToString();
            }
        }
    }
}