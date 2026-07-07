using Auth.Api.Data;
using Auth.Api.Helpers;
using Auth.Api.Interfaces;
using Auth.Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<SmtpSettings>(
    builder.Configuration.GetSection(SmtpSettings.SectionName));
builder.Services.Configure<PasswordResetSettings>(
    builder.Configuration.GetSection(PasswordResetSettings.SectionName));
builder.Services.Configure<FrontendSettings>(
    builder.Configuration.GetSection(FrontendSettings.SectionName));

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseOracle(builder.Configuration.GetConnectionString("OracleConnection")));

builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IAuthService, AuthService>();

var frontendBaseUrl = builder.Configuration.GetSection(FrontendSettings.SectionName)
    .Get<FrontendSettings>()?.BaseUrl ?? "http://localhost:5173";

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins(frontendBaseUrl)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("Frontend");
app.MapControllers();

app.Run();
