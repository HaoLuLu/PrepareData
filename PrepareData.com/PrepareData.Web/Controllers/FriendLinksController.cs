using Abp.Auditing;
using Abp.Threading;
using Abp.UI;
using Abp.Web.Models;
using Abp.Web.Mvc.Authorization;
using PrepareData.Authorization;
using PrepareData.FriendLinks;
using PrepareData.FriendLinks.Dto;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace PrepareData.Web.Controllers
{

    public class FriendLinksController : PrepareDataControllerBase
    {
        private readonly string uploadsFolder = "Uploads";

        private readonly IFriendLinkAppService _friendlinkAppService;

        public FriendLinksController(IFriendLinkAppService friendlinkAppService)
        {
            _friendlinkAppService = friendlinkAppService;
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Sliders()
        {
            return View();
        }

        [DontWrapResult]
        [HttpPost]
        public async Task<JsonResult> List(string Name, int draw, int start, int length, int type)
        {
            var request = new FriendLinkPageListInput { start = start, length = length, draw = draw, Name = Name, Type = type };
            var result = await _friendlinkAppService.GetPageList(request);
            return Json(new
            {
                draw = result.draw,
                recordsTotal = result.recordsTotal,
                recordsFiltered = result.recordsFiltered,
                data = result.data
            }, JsonRequestBehavior.AllowGet);
        }


        //图片上传
        [HttpPost]
        public JsonResult UploadImg(HttpPostedFileBase file, string id, string name, string type, DateTime lastModifiedDate, int size)
        {
            DateTime timeNow = DateTime.Now;
            string year = timeNow.Year.ToString();
            string month = timeNow.Month.ToString();
            string day = timeNow.Day.ToString();
            var path = string.Format("\\{0}\\{1}\\", uploadsFolder, "FriendLinks");
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

