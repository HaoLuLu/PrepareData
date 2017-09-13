using Abp.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrepareData.SinglePages
{
    public interface ISinglePageManager : IDomainService
    {
        int InsertSinglePage(SinglePage @singlePage);
    }
}