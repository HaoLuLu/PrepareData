using Abp.Domain.Entities;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;

namespace PrepareData.EntityFramework.Repositories
{
    public abstract class PrepareDataRepositoryBase<TEntity, TPrimaryKey> : EfRepositoryBase<PrepareDataDbContext, TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        protected PrepareDataRepositoryBase(IDbContextProvider<PrepareDataDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        //add common methods for all repositories
    }

    public abstract class PrepareDataRepositoryBase<TEntity> : PrepareDataRepositoryBase<TEntity, int>
        where TEntity : class, IEntity<int>
    {
        protected PrepareDataRepositoryBase(IDbContextProvider<PrepareDataDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        //do not add any method here, add to the class above (since this inherits it)
    }
}
