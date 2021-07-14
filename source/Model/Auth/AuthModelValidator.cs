using FluentValidation;

namespace Architecture.Model
{
    public sealed class AuthModelValidator : AbstractValidator<AuthModel>
    {
        public AuthModelValidator()
        {
            RuleFor(auth => auth.Login).NotEmpty();
            RuleFor(auth => auth.Password).NotEmpty();
            RuleFor(auth => auth.Roles).NotEmpty();
        }
    }
}
