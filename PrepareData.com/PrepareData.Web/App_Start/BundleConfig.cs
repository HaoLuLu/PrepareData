using System.Web.Optimization;

namespace PrepareData.Web
{
    public static class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();

            //VENDOR RESOURCES

            //~/Bundles/vendor/css
            bundles.Add(
                new StyleBundle("~/Bundles/vendor/css")
                    .Include("~/Content/materialize/css/materialize.min.css", new CssRewriteUrlTransform())
                    .Include("~/Content/toastr.min.css", new CssRewriteUrlTransform())
                    .Include("~/Scripts/sweetalert/sweet-alert.css", new CssRewriteUrlTransform())
                    .Include("~/Content/flags/famfamfam-flags.css", new CssRewriteUrlTransform())
                    .Include("~/Content/css/font-awesome.min.css", new CssRewriteUrlTransform())
                );

            //~/Bundles/vendor/js/top (These scripts should be included in the head of the page)
            bundles.Add(
                new ScriptBundle("~/Bundles/vendor/js/top")
                    .Include(
                        "~/Abp/Framework/scripts/utils/ie10fix.js",
                        "~/Scripts/modernizr-2.8.3.js"
                    )
                );

            //~/Bundles/vendor/bottom (Included in the bottom for fast page load)
            bundles.Add(
                new ScriptBundle("~/Bundles/vendor/js/bottom")
                    .Include(
                        "~/Scripts/json2.min.js",

                        "~/Scripts/jquery-2.2.0.min.js",

                        "~/Content/materialize/js/materialize.min.js",

                        "~/Scripts/moment-with-locales.min.js",
                        "~/Scripts/jquery.validate.min.js",
                        "~/Scripts/jquery.blockUI.js",
                        "~/Scripts/toastr.min.js",
                        "~/Scripts/sweetalert/sweet-alert.min.js",
                        "~/Scripts/others/spinjs/spin.js",
                        "~/Scripts/others/spinjs/jquery.spin.js",

                        "~/Abp/Framework/scripts/abp.js",
                        "~/Abp/Framework/scripts/libs/abp.jquery.js",
                        "~/Abp/Framework/scripts/libs/abp.toastr.js",
                        "~/Abp/Framework/scripts/libs/abp.blockUI.js",
                        "~/Abp/Framework/scripts/libs/abp.spin.js",
                        "~/Abp/Framework/scripts/libs/abp.sweet-alert.js"
                    )
                );

            //APPLICATION RESOURCES

            //~/Bundles/css
            bundles.Add(
                new StyleBundle("~/Bundles/css")
                    .Include("~/Content/css/main.css")
                );

            //~/Bundles/js
            bundles.Add(
                new ScriptBundle("~/Bundles/js")
                    .Include(
                        "~/Scripts/global.js",
                        "~/Scripts/main.js"
                        
                    )
                );


            //~/Bundles/js     首页
            bundles.Add(
                new ScriptBundle("~/Bundles/Index/js")
                    .Include(
                        "~/Scripts/jquery-2.2.0.min.js",
                        "~/Scripts/bootstrap.js",
                        "~/Scripts/preda/agency.js",
                        "~/Scripts/preda/jquery.easing.min.js",
                        "~/Scripts/preda/classie.js",
                        "~/Scripts/preda/cbpAnimatedHeader.js",
                        "~/Scripts/preda/owl.carousel.js"

                    )
                );

            //~/Bundles/css    首页
            bundles.Add(
                new StyleBundle("~/Bundles/Index/css")
                    .Include("~/Content/preda/bootstrap.min.css",
                            "~/Content/preda/style.css",
                            "~/Content/preda/owl.carousel.css",
                            "~/Content/preda/owl.theme.css",
                            "~/Content/preda/font-awesome-4.4.0/css/font-awesome.min.css",
                            "~/Content/preda/fonts.googleapis.css"
                     )
                );
        }
    }
}