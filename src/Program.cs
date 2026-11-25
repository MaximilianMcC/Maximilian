class Program
{
	public static void Main(string[] args)
	{
		// Make the app
		WebApplication app = WebApplication.CreateBuilder(args).Build();

		app.MapGet("/", () => "kia ora te ao");

		app.Run();
	}
}