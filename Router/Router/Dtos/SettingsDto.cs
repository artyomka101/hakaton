using Microsoft.AspNetCore.Mvc.Razor;

namespace Router.Dtos
{
    public class SettingsDto
    {
        public string Language { get; set; } = "en";
        public string Topic { get; set; } = "Hello, how are you?";
        public string Сomplexity { get; set; } = "Легко";
    }
}
