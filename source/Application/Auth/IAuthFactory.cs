using Architecture.Domain;
using Architecture.Model;

namespace Architecture.Application
{
    public interface IAuthFactory
    {
        Auth Create(AuthModel model);
    }
}
