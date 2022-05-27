using BaseProject.Authorization;
using BaseProject.Entities;
using BaseProject.Helpers;
using BaseProject.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// add services to DI container
{
    var services = builder.Services;
    var env = builder.Environment;

    services.AddDbContext<DataContext>();
    services.AddCors();
    services.AddControllers().AddJsonOptions(x =>
    {
        // serialize enums as strings in api responses (e.g. Role)
        x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
    services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
    services.AddSwaggerGen();

    // configure strongly typed settings object
    services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

    // configure DI for application services
    services.AddScoped<JwtUtils, JwtUtils>();
    services.AddScoped<IAccountService, AccountService>();
    services.AddScoped<IEmailService, EmailService>();
}

var app = builder.Build();

// migrate any database changes on startup (includes initial db creation)
using (var scope = app.Services.CreateScope())
{
    //var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();
    //dataContext.Database.Migrate();
    var context = scope.ServiceProvider.GetRequiredService<DataContext>();
    var testUsers = new List<Account>() {
        new Account
        {
            FirstName = "Test",
            LastName = "User",
            Email = "test@gmail.com",
            Role = Role.Admin,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("test")
        },
        new Account
        {
            FirstName = "Test1",
            LastName = "User2",
            Email = "test2@gmail.com",
            Role = Role.User,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("test")
        },
        new Account
        {
            FirstName = "Test",
            LastName = "User3",
            Email = "test3@gmail.com",
            Role = Role.User,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("test")
        }
    };
    foreach (Account account in testUsers)
        context.Accounts.Add(account);
    context.SaveChanges();
}

// configure HTTP request pipeline
{
    // generated swagger json and swagger ui middleware
    app.UseSwagger();
    app.UseSwaggerUI(x => x.SwaggerEndpoint("/swagger/v1/swagger.json", ".NET Sign-up and Verification API"));

    // global cors policy
    app.UseCors(x => x
        .SetIsOriginAllowed(origin => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());

    // global error handler
    app.UseMiddleware<ErrorHandlerMiddleware>();

    // custom jwt auth middleware
    app.UseMiddleware<JwtMiddleware>();

    app.MapControllers();
}

app.Run("http://localhost:4000");