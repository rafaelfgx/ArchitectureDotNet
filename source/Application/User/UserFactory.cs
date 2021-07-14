using Architecture.Domain;
using Architecture.Model;

namespace Architecture.Application
{
    public sealed class UserFactory : IUserFactory
    {
        public User Create(UserModel model, Auth auth)
        {
            return new User
            (
                new Name(model.FirstName, model.LastName),
                new Email(model.Email),
                auth
            );
        }
    }
}
