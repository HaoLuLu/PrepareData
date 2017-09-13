using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrepareData.SinglePages
{
   
    public class SinglePageManager : ISinglePageManager
    {

        private readonly IRepository<SinglePage, int> _singlePageRepository;

        public SinglePageManager(IRepository<SinglePage, int> singlePageRepository)
        {
            _singlePageRepository = singlePageRepository;
        }
        
        public int InsertSinglePage(SinglePage @singlePage)
        {
            return _singlePageRepository.InsertAndGetId(@singlePage);
        }


    }
}
