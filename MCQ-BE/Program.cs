using MCQ.Data;
using MCQ.Interfaces.Repositories;
using MCQ.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<McqContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("ConnectionString")??
    throw new InvalidOperationException("Connection string is not found"))
    );
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:4200", "https://localhost:7001")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IQuestionsRepository, QuestionsRepository>();

var app = builder.Build();
app.UseCors("AllowAngularApp");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.MapOpenApi();
    // Swashbuckle.AspNetCore need to installed
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        options.RoutePrefix = "swagger"; // URL: /swagger
    });


}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
