using Abp.Application.Features;
using Abp.Domain.Repositories;
using Abp.MultiTenancy;
using PrepareData.Authorization.Roles;
using PrepareData.Editions;
using PrepareData.Users;

namespace PrepareData.MultiTenancy
{
    public class TenantManager : AbpTenantManager<Tenant, Role, User>
    {
        public TenantManager(
            IRepository<Tenant> tenantRepository, 
            IRepository<TenantFeatureSetting, long> tenantFeatureRepository, 
            EditionManager editionManager,
            IAbpZeroFeatureValueStore featureValueStore
            ) 
            : base(
                tenantRepository, 
                tenantFeatureRepository, 
                editionManager,
                featureValueStore
            )
        {
        }
    }
}