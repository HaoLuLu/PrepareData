using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using PrepareData.Authorization;
using PrepareData.Users.Dto;
using Microsoft.AspNet.Identity;
using System.Linq;
using System.Data.Entity;
using Abp.UI;

namespace PrepareData.Users
{
    /* THIS IS JUST A SAMPLE. */
    [AbpAuthorize(PermissionNames.Pages_Users)]
    public class UserAppService : PrepareDataAppServiceBase, IUserAppService
    {
        private readonly IRepository<User, long> _userRepository;
        private readonly IPermissionManager _permissionManager;
        private readonly UserManager _userManager;

        public UserAppService(IRepository<User, long> userRepository, IPermissionManager permissionManager,
            UserManager userManager)
        {
            _userRepository = userRepository;
            _permissionManager = permissionManager;
            _userManager = userManager;
        }

        public async Task ProhibitPermission(ProhibitPermissionInput input)
        {
            var user = await UserManager.GetUserByIdAsync(input.UserId);
            var permission = _permissionManager.GetPermission(input.PermissionName);

            await UserManager.ProhibitPermissionAsync(user, permission);
        }

        //Example for primitive method parameters.
        public async Task RemoveFromRole(long userId, string roleName)
        {
            CheckErrors(await UserManager.RemoveFromRoleAsync(userId, roleName));
        }

        public async Task<ListResultOutput<UserListDto>> GetUsers()
        {
            var users = await _userRepository.GetAllListAsync();

            return new ListResultOutput<UserListDto>(
                users.MapTo<List<UserListDto>>()
                );
        }

        public async Task CreateUser(CreateUserInput input)
        {
            var user = input.MapTo<User>();

            user.TenantId = AbpSession.TenantId;
            if (input.Password != "" || input.Password != null)
            {
                user.Password = new PasswordHasher().HashPassword(input.Password);
            }
            else
            {
                user.Password = new PasswordHasher().HashPassword(User.DefaultPassword);
            }
           
            user.IsEmailConfirmed = true;

            CheckErrors(await UserManager.CreateAsync(user));
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task Cancel(int id)
        {
            var @user = await _userRepository.GetAsync(id); 
            await _userRepository.DeleteAsync(@user);
        }

        /// <summary>
        /// 更新记录
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task Update(CreateUserInput input)
        {
            var model = await _userRepository.GetAsync(input.Id);
            model.Name = input.Name;
            model.Surname = input.Surname;
            model.EmailAddress = input.EmailAddress;
            if (input.Password != "" || input.Password != null)
            {
                model.Password = new PasswordHasher().HashPassword(input.Password);
            }
            else
            {
                model.Password = new PasswordHasher().HashPassword(User.DefaultPassword);
            }
           
            model.IsActive = input.IsActive;
        }

        public async Task<UserListDto> GetDetail(EntityRequestInput<int> input)
        {
            if (input.Id <= 0)
                return new UserListDto() { IsActive = true};
            var model = await _userRepository.GetAsync(input.Id);
            return model == null ? new UserListDto() {  IsActive = true,  } : model.MapTo<UserListDto>();
        }

        /// <summary>
        /// 获得分页数据
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<UserPageListOutput> GetPageList(UserPageListInput input)
        {
            var query = _userManager.Users;
            if (!string.IsNullOrEmpty(input.Name))
                query = query.Where(e => e.Name.Contains(input.Name));
            var list = await query.OrderByDescending(e => e.CreationTime).Skip(input.start).Take(input.length).ToListAsync();
            var pageList = new UserPageListOutput()
            {
                draw = input.draw,
                recordsTotal = query.Count(),
                recordsFiltered = query.Count(),
                data = list.MapTo<List<UserListDto>>()
            };
            return pageList;
        }
        /// <summary>
        /// 主页用
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<UserPageListOutput> GetPageList1(UserPageListInput input)
        {
            var query = _userManager.Users;
            var model = await GetCurrentUserAsync();
            if (!string.IsNullOrEmpty(model.Name))
                query = query.Where(e => e.Name.Contains(model.Name));
            var list = await query.OrderByDescending(e => e.CreationTime).Skip(input.start).Take(input.length).ToListAsync();
            var pageList = new UserPageListOutput()
            {
                draw = input.draw,
                recordsTotal = query.Count(),
                recordsFiltered = query.Count(),
                data = list.MapTo<List<UserListDto>>()
            };
            return pageList;
        }
        //得到当前登录用户的信息
        public async Task<User> GetCurrentUser() {

            var model = await GetCurrentUserAsync();
            return model;
        }

        public async Task ChangPwd(ChangePwdDto input)
        {
            var model = await GetCurrentUserAsync();
            var providePwd = new PasswordHasher().VerifyHashedPassword(model.Password,input.OldPassword);
            if (providePwd.ToString() =="Success")
            {
                model.Password = new PasswordHasher().HashPassword(input.Password);
            }
            else
            {
                throw new UserFriendlyException("请输入正确的旧密码！");
            }
        }
    }
}