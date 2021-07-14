using Architecture.Domain;
using DotNetCore.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Architecture.Database
{
    public sealed class AuthRepository : EFRepository<Auth>, IAuthRepository
    {
        public AuthRepository(Context context) : base(context) { }

        public Task<bool> AnyByLoginAsync(string login)
        {
            return Queryable.AnyAsync(AuthExpression.Login(login));
        }

        public Task<Auth> GetByLoginAsync(string login)
        {
            return Queryable.SingleOrDefaultAsync(AuthExpression.Login(login));
        }
    }
}
