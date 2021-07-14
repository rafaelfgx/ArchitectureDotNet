using Architecture.Domain;
using DotNetCore.Repositories;
using System.Threading.Tasks;

namespace Architecture.Database
{
    public interface IAuthRepository : IRepository<Auth>
    {
        Task<bool> AnyByLoginAsync(string login);

        Task<Auth> GetByLoginAsync(string login);
    }
}
