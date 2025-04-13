using Microsoft.OpenApi.Models;
using lavanderia_backend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Adiciona os serviços essenciais
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Adiciona o banco de dados SQL Server
builder.Services.AddDbContext<LavanderiaContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("LavanderiaConnection")));

var app = builder.Build();

// Ativa Swagger para testes locais
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware de CORS (permite requisições do frontend)
app.UseCors("AllowAll");

app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();
