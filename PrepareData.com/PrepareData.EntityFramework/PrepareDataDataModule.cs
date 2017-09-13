using System.Data.Entity;
using System.Reflection;
using Abp.Modules;
using Abp.Zero.EntityFramework;
using PrepareData.EntityFramework;

namespace PrepareData
{
    [DependsOn(typeof(AbpZeroEntityFrameworkModule), typeof(PrepareDataCoreModule))]
    public class PrepareDataDataModule : AbpModule
    {
        public override void PreInitialize()
        {
            Database.SetInitializer(new CreateDatabaseIfNotExists<PrepareDataDbContext>());

            Configuration.DefaultNameOrConnectionString = "Default";
            Configuration.DefaultNameOrConnectionString = "Default";
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}
