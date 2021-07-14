using Architecture.Model;
using DotNetCore.Objects;
using DotNetCore.Results;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Architecture.Application
{
    public interface IUserService
    {
        Task<IResult<long>> AddAsync(UserModel model);

        Task<IResult> DeleteAsync(long id);

        Task<UserModel> GetAsync(long id);

        Task<Grid<UserModel>> GridAsync(GridParameters parameters);

        Task<IResult> InactivateAsync(long id);

        Task<IEnumerable<UserModel>> ListAsync();

        Task<IResult> UpdateAsync(UserModel model);
    }
}
