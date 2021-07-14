using Architecture.Domain;
using Architecture.Model;

namespace Architecture.Application
{
    public interface IUserFactory
    {
        User Create(UserModel model, Auth auth);
    }
}
