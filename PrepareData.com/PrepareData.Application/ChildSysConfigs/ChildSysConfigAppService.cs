using Abp.Domain.Repositories;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using PrepareData.ChildSysConfigs.Dto;
using Abp.Authorization;

namespace PrepareData.ChildSysConfigs
{

    public class ChildSysConfigAppService : PrepareDataAppServiceBase, IChildSysConfigAppService
    {
        private readonly IRepository<ChildSysConfig> _repository;
        public ChildSysConfigAppService(
            IRepository<ChildSysConfig> repository)
        {
            _repository = repository;
        }
        
        public async Task<List<ChildSysConfig>> GetAllList()
        {
            return await _repository.GetAllListAsync();
        }

        [AbpAllowAnonymous]
        public async Task<List<ChildSysConfig>> GetShowConfigs(int? tenantId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                return await _repository.GetAll().Where(o => o.IsShow).ToListAsync();
            }
        }

        public async Task Update(UpdateInput input)
        {
            var model = await _repository.GetAsync(input.Id);
            model.Type = input.Type;
            model.IsShow = input.IsShow;
            switch (input.Type)
            {
                case EnumConfigType.Checkbox:
                    model.Text =string.Join(",",input.Checks);
                    break;
                case EnumConfigType.Img:
                case EnumConfigType.Text:
                case EnumConfigType.Multiline:
                    model.Text=input.Text;
                    break;
                case EnumConfigType.Radio:
                    model.Value = input.Value;
                    model.Text = input.Text?.Trim();
                    break;
                case EnumConfigType.Textarea:
                    model.Content = input.Content;
                    break;
            }
            model.Url = input.Url;
        }
    }
}