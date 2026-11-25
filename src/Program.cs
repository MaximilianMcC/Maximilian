using Microsoft.Extensions.FileProviders;

class Program
{
	public static void Main(string[] args)
	{
		// Make the app
		WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
		WebApplication app = builder.Build();

		// Serve everything in the public directory as is
		//? to get `./assets/public/images/test.png` you'd ask for `/images/test.png`
		app.UseStaticFiles(new StaticFileOptions()
		{
			FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "assets", "public")),
			RequestPath = ""
		});

		app.MapGet("/", () => "kia ora e te ao");

		app.Run();
	}
}