using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using PrepareData.Authorization;
using PrepareData.MultiTenancy;
using PrepareData.MultiTenancy.Dto;
using System.Threading.Tasks;
using System;
using Abp.Web.Models;
using System.Web;
using System.IO;
using System.Text;
using System.Security.Cryptography;

namespace PrepareData.Web.Controllers
{
    [AbpMvcAuthorize(PermissionNames.Pages_Tenants)]
    public class TenantsController : PrepareDataControllerBase
    {
        private readonly string uploadsFolder = "Uploads";
        private readonly ITenantAppService _tenantAppService;

        public TenantsController(ITenantAppService tenantAppService)
        {
            _tenantAppService = tenantAppService;
        }

        public ActionResult Index()
        {
            return View();
        }

        [DontWrapResult]
        [HttpPost]
        public async Task<JsonResult> List(string Name, int draw, int start, int length)
        {
            var request = new TenantPageListInput { start = start, length = length, draw = draw, Name = Name };
            var result = await _tenantAppService.GetPageList(request);
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
            var path = string.Format("\\{0}\\{1}\\", uploadsFolder, "Tenants");
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