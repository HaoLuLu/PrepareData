using Abp.Application.Services;
using Abp.Application.Services.Dto;
using PrepareData.TenantGroups.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PrepareData.TenantGroups
{
    public interface ITenantGroupAppService : IApplicationService
    {
        //新增
        Task Create(CreateTenantGroupInput input);
        //删除
        Task Cancel(int id);

        // 修改
        Task Update(CreateTenantGroupInput input);

        Task<ListResultOutput<TenantGroupDto>> GetList(TenantGroupDto input);

        Task<TenantGroupPageList> GetPageList(TenantGroupPageListInput input);

        Task<TenantGroupDto> GetDetail(EntityRequestInput<int> input);

        Task<List<SelectOutput>> GetSelectList();
        /// <summary>
        /// 提供给汇总页的机构组信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<dynamic> GetTenantGroupsInfo(EntityRequestInput<int> input);
    }
}
