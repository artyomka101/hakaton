using Router.Dtos;
using Router.Repositories.Interfaces;
using Router.Repositories.Models;

namespace Router.Repositories.Implementations
{
    public class SettingsRepository: ISettingsRepository
    {
        private SettingsDto _settings = new SettingsDto();
        public async Task<SettingsDto> GetSettingsAsync()
        {
            return await Task.FromResult(_settings);
        }

        public Task SetSettingsAsync(SettingsDto settingsDto)
        {
            _settings = settingsDto;
            return Task.CompletedTask;
        }
    }
}
