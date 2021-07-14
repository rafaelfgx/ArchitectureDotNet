using Architecture.Database;
using Architecture.Domain;
using Architecture.Model;
using DotNetCore.EntityFrameworkCore;
using DotNetCore.Objects;
using DotNetCore.Results;
using DotNetCore.Validation;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Architecture.Application
{
    public sealed class UserService : IUserService
    {
        private readonly IAuthService _authService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserFactory _userFactory;
        private readonly IUserRepository _userRepository;

        public UserService
        (
            IAuthService authService,
            IUnitOfWork unitOfWork,
            IUserFactory userFactory,
            IUserRepository userRepository
        )
        {
            _authService = authService;
            _unitOfWork = unitOfWork;
            _userFactory = userFactory;
            _userRepository = userRepository;
        }

        public async Task<IResult<long>> AddAsync(UserModel model)
        {
            var validation = new AddUserModelValidator().Validation(model);

            if (validation.Failed) return validation.Fail<long>();

            var auth = await _authService.AddAsync(model.Auth);

            if (auth.Failed) return auth.Fail<long>();

            var user = _userFactory.Create(model, auth.Data);

            await _userRepository.AddAsync(user);

            await _unitOfWork.SaveChangesAsync();

            return user.Id.Success();
        }

        public async Task<IResult> DeleteAsync(long id)
        {
            var authId = await _userRepository.GetAuthIdByUserIdAsync(id);

            await _userRepository.DeleteAsync(id);

            await _authService.DeleteAsync(authId);

            await _unitOfWork.SaveChangesAsync();

            return Result.Success();
        }

        public Task<UserModel> GetAsync(long id)
        {
            return _userRepository.GetModelAsync(id);
        }

        public Task<Grid<UserModel>> GridAsync(GridParameters parameters)
        {
            return _userRepository.GridAsync(parameters);
        }

        public async Task<IResult> InactivateAsync(long id)
        {
            var user = new User(id);

            user.Inactivate();

            await _userRepository.UpdateStatusAsync(user);

            await _unitOfWork.SaveChangesAsync();

            return Result.Success();
        }

        public async Task<IEnumerable<UserModel>> ListAsync()
        {
            return await _userRepository.ListModelAsync();
        }

        public async Task<IResult> UpdateAsync(UserModel model)
        {
            var validation = new UpdateUserModelValidator().Validation(model);

            if (validation.Failed) return validation;

            var user = await _userRepository.GetAsync(model.Id);

            if (user is null) return Result.Success();

            user.Update(model.FirstName, model.LastName, model.Email);

            await _userRepository.UpdateAsync(user);

            await _unitOfWork.SaveChangesAsync();

            return Result.Success();
        }
    }
}
