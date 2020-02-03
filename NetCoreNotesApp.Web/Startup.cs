using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NetCoreNotesApp.BLL.Core;
using NetCoreNotesApp.BLL.Services;
using NetCoreNotesApp.DAL.Core;
using NetCoreNotesApp.DAL.Interfaces;
using NetCoreNotesApp.DAL.Repositories;
using Newtonsoft.Json;
using System.IO;

namespace NetCoreNotesApp.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2).AddJsonOptions(options => {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            }); ;

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services
                .AddScoped<DbContext, NotesContext>()
                .AddDbContext<NotesContext>(options => options.UseSqlServer(GetConnectionString("DefaultConnection")))
                .AddTransient<INoteRepository, NoteRepository>()
                .AddTransient<ISeverityRepository, SeverityRepository>()
                .AddTransient<ITagRepository, TagRepository>()
                .AddTransient<INotesTagRepository, NotesTagRepository>()
                .AddTransient<IRepositoryContext, RepositoryContext>()
                .AddTransient<INoteService, NoteService>()
                .AddTransient<ITagService, TagService>()
                .AddAutoMapper(typeof(Startup));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                scope.ServiceProvider.GetService<NotesContext>().Database.Migrate();
            }
        }

        private string GetConnectionString(string key)
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), "App_Data");
            return Configuration.GetConnectionString(key).Replace("|DataDirectory|", path);
        }
    }
}
