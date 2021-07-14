using FluentValidation;

namespace Architecture.Model
{
    public abstract class UserModelValidator : AbstractValidator<UserModel>
    {
        public void Id() => RuleFor(user => user.Id).NotEmpty();

        public void FirstName() => RuleFor(user => user.FirstName).NotEmpty();

        public void Email() => RuleFor(user => user.Email).EmailAddress();

        public void LastName() => RuleFor(user => user.LastName).NotEmpty();

        public void Auth() => RuleFor(user => user.Auth).SetValidator(new AuthModelValidator());
    }
}
