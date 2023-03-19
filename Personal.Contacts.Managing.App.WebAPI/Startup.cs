using Personal.Contacts.Managing.App.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using MediatR;
using FluentValidation;
using Personal.Contacts.Managing.App.Application;
using Personal.Contacts.Managing.App.Application.Validators.Commands;
using Personal.Contacts.Managing.App.Application.Validators.Queries;

namespace Personal.Contacts.Managing.App.WebAPI
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration config) => this.Configuration = config;

        public void ConfigureServices(IServiceCollection services)
        {
            string connectionString = Configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(AppDomain.CurrentDomain.GetAssemblies()));

            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
            services.AddValidatorsFromAssemblyContaining(typeof(GetAllContactsQueryValidator));
            services.AddValidatorsFromAssemblyContaining(typeof(GetContactByIdQueryValidator));
            services.AddValidatorsFromAssemblyContaining(typeof(CreateContactCommandValidator));
            services.AddValidatorsFromAssemblyContaining(typeof(UpdateContactCommandValidator));
            services.AddValidatorsFromAssemblyContaining(typeof(DeleteContactCommandValidator));

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddHttpContextAccessor();
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.EnvironmentName == "Development")
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseRouting();

            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();
            app.UseSwaggerUI();
        }
    }
}
