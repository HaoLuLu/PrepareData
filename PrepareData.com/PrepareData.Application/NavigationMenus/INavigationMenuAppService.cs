using Abp.Application.Services;
using Abp.Application.Services.Dto;
using PrepareData.NavigationMenus.Dtos;
using PrepareData.TenantGroups.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PrepareData.NavigationMenus
{
    public interface INavigationMenuAppService : IApplicationService
    {
        //新增
        Task Create(NavigationMenuDto input);
        //删除
        Task Cancel(int id);

        // 修改
        Task Update(NavigationMenuDto input);

        Task<NavigationMenuDto> GetDetail(EntityRequestInput<int> input);

        Task<NavigationMenuPageList> GetPageList(NavigationMenuPageListInput input);

        ListResultOutput<NavigationMenuDto> GetListTree(NavigationMenuDto input);
        Task<List<SelectOutput>> GetSelectList(int type = 0);
    }
}
