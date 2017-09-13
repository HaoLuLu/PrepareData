using PrepareData.EntityFramework;
using EntityFramework.DynamicFilters;

namespace PrepareData.Migrations.SeedData
{
    public class InitialHostDbBuilder
    {
        private readonly PrepareDataDbContext _context;

        public InitialHostDbBuilder(PrepareDataDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            _context.DisableAllFilters();

            new DefaultEditionsCreator(_context).Create();
            new DefaultLanguagesCreator(_context).Create();
            new HostRoleAndUserCreator(_context).Create();
            new DefaultSettingsCreator(_context).Create();
            new DefaultChildSysConfigsCreator(_context).Create(null);
        }
    }
}
