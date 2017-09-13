using Abp.Domain.Repositories;

namespace PrepareData.FriendLinks
{

   public  class FriendLinkManager : IFriendLinkManager
    {

        private readonly IRepository<FriendLink, int> _friendLinkRepository;

        public FriendLinkManager(IRepository<FriendLink, int> friendLinkRepository)
        {
            _friendLinkRepository = friendLinkRepository;
        }


        public int InsertFriendLink(FriendLink @friendLink)
        {
            return _friendLinkRepository.InsertAndGetId(@friendLink);
        }


    }

}