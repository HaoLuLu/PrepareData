using Abp.Web.Mvc.Views;

namespace PrepareData.Web.Views
{
    public abstract class PrepareDataWebViewPageBase : PrepareDataWebViewPageBase<dynamic>
    {

    }

    public abstract class PrepareDataWebViewPageBase<TModel> : AbpWebViewPage<TModel>
    {
        protected PrepareDataWebViewPageBase()
        {
            LocalizationSourceName = PrepareDataConsts.LocalizationSourceName;
        }
    }
}