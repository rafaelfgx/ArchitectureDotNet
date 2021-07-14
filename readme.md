# Architecture

![](https://github.com/rafaelfgx/Architecture/actions/workflows/build.yaml/badge.svg)

**https://rafaelfgx-architecture.herokuapp.com**

This project is an example of architecture using new technologies and best practices.

The goal is to share knowledge and use it as reference for new projects.

Thanks for enjoying!

## Technologies

* [.NET 5](https://dotnet.microsoft.com/download)
* [ASP.NET Core 5](https://docs.microsoft.com/en-us/aspnet/core)
* [Entity Framework Core 5](https://docs.microsoft.com/en-us/ef/core)
* [C# 9](https://docs.microsoft.com/en-us/dotnet/csharp)
* [Angular 12](https://angular.io/docs)
* [UIkit](https://getuikit.com/docs/introduction)

## Practices

* Clean Architecture
* Clean Code
* SOLID Principles
* Separation of Concerns
* DDD (Domain-Driven Design)

## Run

<details>
<summary>Command Line</summary>

#### Prerequisites

* [.NET SDK](https://dotnet.microsoft.com/download/dotnet)
* [SQL Server](https://go.microsoft.com/fwlink/?linkid=866662)
* [Node](https://nodejs.org)
* [Angular CLI](https://cli.angular.io)

#### Steps

1. Open directory **source\Web\Frontend** in command line and execute **npm i**.
2. Open directory **source\Web** in command line and execute **dotnet run**.
3. Open <https://localhost:8090>.

</details>

<details>
<summary>Visual Studio Code</summary>

#### Prerequisites

* [.NET SDK](https://dotnet.microsoft.com/download/dotnet)
* [SQL Server](https://go.microsoft.com/fwlink/?linkid=866662)
* [Node](https://nodejs.org)
* [Angular CLI](https://cli.angular.io)
* [Visual Studio Code](https://code.visualstudio.com)
* [C# Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp)

#### Steps

1. Open directory **source\Web\Frontend** in command line and execute **npm i**.
2. Open **source** directory in Visual Studio Code.
3. Press **F5**.

</details>

<details>
<summary>Visual Studio</summary>

#### Prerequisites

* [Visual Studio](https://visualstudio.microsoft.com)
* [Node](https://nodejs.org)
* [Angular CLI](https://cli.angular.io)

#### Steps

1. Open directory **source\Web\Frontend** in command line and execute **npm i**.
2. Open **source\Architecture.sln** in Visual Studio.
3. Set **Architecture.Web** as startup project.
4. Press **F5**.

</details>

<details>
<summary>Docker</summary>

#### Prerequisites

* [Docker](https://www.docker.com/get-started)

#### Steps

1. Execute **docker-compose up --build -d** in root directory.
2. Open <http://localhost:8090>.

</details>

## Nuget Packages

**Source:** [https://github.com/rafaelfgx/DotNetCore](https://github.com/rafaelfgx/DotNetCore)

**Published:** [https://www.nuget.org/profiles/rafaelfgx](https://www.nuget.org/profiles/rafaelfgx)

## Layers

**Web:** Frontend and API.

**Application:** Flow control.

**Domain:** Business rules and domain logic.

**Model:** Data transfer objects.

**Database:** Data persistence.

## Web

### Frontend

### Service

```typescript
export class AppCustomerService {
    constructor(private readonly http: HttpClient, private readonly gridService: GridService) { }

    add = (customer: Customer) => this.http.post<number>("customers", customer);

    delete = (id: number) => this.http.delete(`customers/${id}`);

    get = (id: number) => this.http.get<Customer>(`customers/${id}`);

    grid = (parameters: GridParameters) => this.gridService.get<Customer>("customers/grid", parameters);

    inactivate = (id: number) => this.http.patch(`customers/${id}/inactivate`, {});

    list = () => this.http.get<Customer[]>("customers");

    update = (customer: Customer) => this.http.put(`customers/${customer.id}`, customer);
}
```

### Guard

```typescript
export class AppGuard implements CanActivate {
    constructor(private readonly appAuthService: AppAuthService) { }

    canActivate() {
        if (this.appAuthService.authenticated()) { return true; }
        this.appAuthService.signin();
        return false;
    }
}
```

### ErrorHandler

```typescript
export class AppErrorHandler implements ErrorHandler {
    constructor(private readonly appModalService: AppModalService) { }

    handleError(error: any) {
        if (error instanceof HttpErrorResponse) {
            switch (error.status) {
                case 422: { this.appModalService.alert(error.error); return; }
            }
        }

        console.error(error);
    }
}
```

### HttpInterceptor

```typescript
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private readonly appAuthService: AppAuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        request = request.clone({
            setHeaders: { Authorization: `Bearer ${this.appAuthService.token()}` }
        });

        return next.handle(request);
    }
}
```
### API

### Startup

```csharp
public sealed class Startup
{
    public void Configure(IApplicationBuilder application)
    {
        application.UseException();
        application.UseHttps();
        application.UseRouting();
        application.UseResponseCompression();
        application.UseAuthentication();
        application.UseAuthorization();
        application.UseEndpointsMapControllers();
        application.UseSpa();
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddSecurity();
        services.AddResponseCompression();
        services.AddControllersWithJsonOptionsAndAuthorizationPolicy();
        services.AddSpa();
        services.AddContext();
        services.AddServices();
    }
}
```

### Controller

```csharp
[ApiController]
[Route("customers")]
public sealed class CustomerController : ControllerBase
{
    private readonly ICustomerService _customerService;

    public CustomerController(ICustomerService customerService) => _customerService = customerService;

    [HttpPost]
    public IActionResult Add(CustomerModel model) => _customerService.AddAsync(model).ApiResult();

    [HttpDelete("{id}")]
    public IActionResult Delete(long id) => _customerService.DeleteAsync(id).ApiResult();

    [HttpGet("{id}")]
    public IActionResult Get(long id) => _customerService.GetAsync(id).ApiResult();

    [HttpGet("grid")]
    public IActionResult Grid([FromQuery] GridParameters parameters) => _customerService.GridAsync(parameters).ApiResult();

    [HttpPatch("{id}/inactivate")]
    public IActionResult Inactivate(long id) => _customerService.InactivateAsync(id).ApiResult();

    [HttpGet]
    public IActionResult List() => _customerService.ListAsync().ApiResult();

    [HttpPut("{id}")]
    public IActionResult Update(CustomerModel model) => _customerService.UpdateAsync(model).ApiResult();
}
```

## Application

### Service

```csharp
public sealed class CustomerService : ICustomerService
{
    private readonly ICustomerFactory _customerFactory;
    private readonly ICustomerRepository _customerRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CustomerService
    (
        ICustomerFactory customerFactory,
        ICustomerRepository customerRepository,
        IUnitOfWork unitOfWork
    )
    {
        _customerFactory = customerFactory;
        _customerRepository = customerRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<IResult<long>> AddAsync(CustomerModel model)
    {
        var validation = new AddCustomerModelValidator().Validation(model);

        if (validation.Failed) return validation.Fail<long>();

        var customer = _customerFactory.Create(model);

        await _customerRepository.AddAsync(customer);

        await _unitOfWork.SaveChangesAsync();

        return customer.Id.Success();
    }

    public async Task<IResult> DeleteAsync(long id)
    {
        await _customerRepository.DeleteAsync(id);

        await _unitOfWork.SaveChangesAsync();

        return Result.Success();
    }

    public Task<CustomerModel> GetAsync(long id)
    {
        return _customerRepository.GetModelAsync(id);
    }

    public Task<Grid<CustomerModel>> GridAsync(GridParameters parameters)
    {
        return _customerRepository.GridAsync(parameters);
    }

    public async Task<IResult> InactivateAsync(long id)
    {
        var customer = new Customer(id);

        customer.Inactivate();

        await _customerRepository.UpdateStatusAsync(customer);

        await _unitOfWork.SaveChangesAsync();

        return Result.Success();
    }

    public Task<IEnumerable<CustomerModel>> ListAsync()
    {
        return _customerRepository.ListModelAsync();
    }

    public async Task<IResult> UpdateAsync(CustomerModel model)
    {
        var validation = new UpdateCustomerModelValidator().Validation(model);

        if (validation.Failed) return validation;

        var customer = _customerFactory.Create(model);

        await _customerRepository.UpdateAsync(customer);

        await _unitOfWork.SaveChangesAsync();

        return Result.Success();
    }
}
```

### Factory

```csharp
public sealed class CustomerFactory : ICustomerFactory
{
    public Customer Create(CustomerModel model)
    {
        return new Customer
        (
            model.Id,
            new Name(model.FirstName, model.LastName),
            new Email(model.Email)
        );
    }
}
```

## Domain

### Entity

```csharp
public sealed class Customer : Entity<long>
{
    public Customer(long id) => Id = id;

    public Customer
    (
        long id,
        Name name,
        Email email
    )
    {
        Id = id;
        Name = name;
        Email = email;
        Activate();
    }

    public Name Name { get; private set; }

    public Email Email { get; private set; }

    public Status Status { get; private set; }

    public void Activate() => Status = Status.Active;

    public void Inactivate() => Status = Status.Inactive;
}
```

### ValueObject

```csharp
public sealed record Name(string FirstName, string LastName);
```

## Model

### Model

```csharp
public sealed record CustomerModel
{
    public long Id { get; init; }

    public string FirstName { get; init; }

    public string LastName { get; init; }

    public string Email { get; init; }
}
```

### ModelValidator

```csharp
public abstract class CustomerModelValidator : AbstractValidator<CustomerModel>
{
    public void Id() => RuleFor(customer => customer.Id).NotEmpty();

    public void FirstName() => RuleFor(customer => customer.FirstName).NotEmpty();

    public void LastName() => RuleFor(customer => customer.LastName).NotEmpty();

    public void Email() => RuleFor(customer => customer.Email).EmailAddress();
}
```

```csharp
public sealed class AddCustomerModelValidator : CustomerModelValidator
{
    public AddCustomerModelValidator() => FirstName(); LastName(); Email();
}
```

```csharp
public sealed class UpdateCustomerModelValidator : CustomerModelValidator
{
    public UpdateCustomerModelValidator() => Id(); FirstName(); LastName(); Email();
}
```

## Database

### Context

```csharp
public sealed class Context : DbContext
{
    public Context(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(typeof(Context).Assembly).Seed();
    }
}
```

### Configuration

```csharp
public sealed class CustomerConfiguration : IEntityTypeConfiguration<Customer>
{
    public void Configure(EntityTypeBuilder<Customer> builder)
    {
        builder.ToTable(nameof(Customer), nameof(Customer));

        builder.HasKey(customer => customer.Id);

        builder.Property(customer => customer.Id).ValueGeneratedOnAdd().IsRequired();

        builder.Property(customer => customer.Status).IsRequired();

        builder.OwnsOne(customer => customer.Name, customerName =>
        {
            customerName.Property(name => name.FirstName).HasColumnName(nameof(Name.FirstName)).HasMaxLength(100).IsRequired();

            customerName.Property(name => name.LastName).HasColumnName(nameof(Name.LastName)).HasMaxLength(200).IsRequired();
        });

        builder.OwnsOne(customer => customer.Email, customerEmail =>
        {
            customerEmail.Property(email => email.Value).HasColumnName(nameof(User.Email)).HasMaxLength(300).IsRequired();

            customerEmail.HasIndex(email => email.Value).IsUnique();
        });
    }
}
```

### Repository

```csharp
public sealed class CustomerRepository : EFRepository<Customer>, ICustomerRepository
{
    public CustomerRepository(Context context) : base(context) { }

    public Task<CustomerModel> GetModelAsync(long id)
    {
        return Queryable.Where(CustomerExpression.Id(id)).Select(CustomerExpression.Model).SingleOrDefaultAsync();
    }

    public Task<Grid<CustomerModel>> GridAsync(GridParameters parameters)
    {
        return Queryable.Select(CustomerExpression.Model).GridAsync(parameters);
    }

    public async Task<IEnumerable<CustomerModel>> ListModelAsync()
    {
        return await Queryable.Select(CustomerExpression.Model).ToListAsync();
    }

    public Task UpdateStatusAsync(Customer customer)
    {
        return UpdatePartialAsync(new { customer.Id, customer.Status });
    }
}
```

### Expression

```cs
public static class CustomerExpression
{
    public static Expression<Func<Customer, CustomerModel>> Model => customer => new CustomerModel
    {
        Id = user.Id,
        FirstName = user.Name.FirstName,
        LastName = user.Name.LastName,
        Email = user.Email.Value
    };

    public static Expression<Func<Customer, bool>> Id(long id) => customer => customer.Id == id;
}
```
