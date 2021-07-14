using Architecture.Domain;
using Architecture.Model;
using DotNetCore.Objects;
using DotNetCore.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Architecture.Database
{
    public interface IUserRepository : IRepository<User>
    {
        Task<long> GetAuthIdByUserIdAsync(long id);

        Task<UserModel> GetModelAsync(long id);

        Task<Grid<UserModel>> GridAsync(GridParameters parameters);

        Task<IEnumerable<UserModel>> ListModelAsync();

        Task UpdateStatusAsync(User user);
    }
}
