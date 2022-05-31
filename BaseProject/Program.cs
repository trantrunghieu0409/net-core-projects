

using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;


services.AddControllers();
services.AddSingleton<IConnectionMultiplexer>(sp => 
    ConnectionMultiplexer.Connect("localhost")
    );

var app = builder.Build();
//app.MapGet("/", () => "Hello World!");
var env = builder.Environment;
if (env.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});
app.Run();
