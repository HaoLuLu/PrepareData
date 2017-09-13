using System.Linq;
using PrepareData.EntityFramework;
using PrepareData.MultiTenancy;
using System;

namespace PrepareData.Migrations.SeedData
{
    public class DefaultTenantCreator
    {
        private readonly PrepareDataDbContext _context;

        public DefaultTenantCreator(PrepareDataDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            CreateUserAndRoles();
        }

        private void CreateUserAndRoles()
        {
            //Default tenant

            var defaultTenant = _context.Tenants.FirstOrDefault(t => t.TenancyName == Tenant.DefaultTenantName);
            if (defaultTenant == null)
            {
                _context.Tenants.Add(new Tenant {TenancyName = Tenant.DefaultTenantName, Name = Tenant.DefaultTenantName, CreationTime=DateTime.Now, AuthorizedEndTime =DateTime.Now.AddYears(1),IsActive=true});
                _context.SaveChanges();
            }
        }
    }
}
