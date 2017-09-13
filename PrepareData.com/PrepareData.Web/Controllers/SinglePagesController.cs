using Abp.Threading;
using Abp.Web.Models;
using PrepareData.SinglePages;
using PrepareData.SinglePages.Dto;
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
    public class SinglePagesController : PrepareDataControllerBase
    {
        private readonly string uploadsFolder = "Uploads";
        private readonly ISinglePageAppService _singlePageAppService;

        public SinglePagesController(ISinglePageAppService singlePageAppService)
        {
            _singlePageAppService = singlePageAppService;
        }

        public ActionResult SinglePageIndex()
        {

            return View();
        }
        [DontWrapResult]
        [HttpPost]
        public async Task<JsonResult> List(string Title, int draw, int start, int length)
        {
            var request = new SinglePageListInput { start = start, length = length, draw = draw, Title = Title };
            var result = await _singlePageAppService.GetPageList(request);
            return Json(new
            {
                draw = result.draw,
                recordsTotal = result.recordsTotal,
                recordsFiltered = result.recordsFiltered,
                data = result.data
            }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SinglePage(int id)
        {
            var models = AsyncHelper.RunSync(() => _singlePageAppService.GetDetail(id));
            return View(models);
        }

        public ActionResult SinglePageDetail(int Id = 0)
        {
            var models = AsyncHelper.RunSync(() => _singlePageAppService.GetDetail(Id)) ?? new SinglePageDto() {IsPublish="1",PublishTime=DateTime.Now };
            return View(models);
        }

        //图片上传
        [HttpPost]
        public JsonResult UploadImg(HttpPostedFileBase file, string id, string name, string type, DateTime lastModifiedDate, int size)
        {
            DateTime timeNow = DateTime.Now;
            string year = timeNow.Year.ToString();
            string month = timeNow.Month.ToString();
            string day = timeNow.Day.ToString();
            var path = string.Format("\\{0}\\{1}\\", uploadsFolder, "SinglePages");
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