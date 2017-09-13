using Abp.Threading;
using Abp.Web.Models;
using PrepareData.Articles;
using PrepareData.Articles.Dto;
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
   
    public class ArticlesController : PrepareDataControllerBase
    {
        private readonly string uploadsFolder = "Uploads";

        private readonly IArticleAppService _articleAppService;

        public ArticlesController(IArticleAppService articleAppService)
        {
            _articleAppService = articleAppService;
        }

        public ActionResult ArticleIndex()
        {
            return View();
        }
        public ActionResult Article(int id)
        {
            var model = AsyncHelper.RunSync(() => _articleAppService.GetDetail(id));
            return View(model);
        }

        public ActionResult ListPage(int mid)
        {
            ViewBag.Mid = mid;
            var request = new ArticleListInput { NavigationMenuId= mid };
            var list = AsyncHelper.RunSync(() => _articleAppService.GetList(request));
            return View(list);
        }

        public ActionResult ArticleDetail(int Id = 0)
        {
            //    var models = await _articleAppService.GetDetail(Id);
            //    if (models != null)
            //    {
            //        ViewBag.models = models;
            //    }
            //return View();
            var models = AsyncHelper.RunSync(() => _articleAppService.GetDetail(Id)) ?? new ArticleDto() { IsTop = false, IsCheck = true,PublishTime=DateTime.Now };
            return View(models);
        }

        [DontWrapResult]
        [HttpPost]
        public async Task<JsonResult> List(string Title, int draw, int start, int length)
        {
            var request = new ArticlePageListInput { start = start, length = length, draw = draw, Title = Title };
            var result = await _articleAppService.GetPageList(request);
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
            var path = string.Format("\\{0}\\{1}\\", uploadsFolder, "Articles");
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