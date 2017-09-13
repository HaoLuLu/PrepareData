using System.Data.Entity;
using System.Reflection;
using Abp.Modules;
using PrepareData.EntityFramework;

namespace PrepareData.Migrator
{
    [DependsOn(typeof(PrepareDataDataModule))]
    public class PrepareDataMigratorModule : AbpModule
    {
        public override void PreInitialize()
        {
            Database.SetInitializer<PrepareDataDbContext>(null);

            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}