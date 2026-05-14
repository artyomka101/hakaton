using Microsoft.AspNetCore.Mvc;
using Router.Dtos;
using Router.Repositories.Interfaces;

namespace Router.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController(ISettingsRepository settingsRepository) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> SetSettings([FromBody]SettingsDto settings)
        {
            await settingsRepository.SetSettingsAsync(settings);
            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetSettings()
        {
            var results = await settingsRepository.GetSettingsAsync();  
            return Ok(results);
        }

    }
}

// контроллер для взаимодействия с ИИ(прием и отправка настроек для использования в промпте) 2 репозитория для приема и отправки настроек как переменных, интерфейсы для этих репов 
