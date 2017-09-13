using Abp.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PrepareData.FriendLinks
{
   
        public interface IFriendLinkManager : IDomainService
        {
        /// <summary>
        /// 插入
        /// </summary>
        /// <param name="friendLink"></param>
        /// <returns></returns>
        int InsertFriendLink(FriendLink @friendLink);

        }
}
