namespace Architecture.Model
{
    public sealed class AddUserModelValidator : UserModelValidator
    {
        public AddUserModelValidator()
        {
            FirstName(); LastName(); Email(); Auth();
        }
    }
}
