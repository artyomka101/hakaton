using Router.Dtos;

namespace Router.Repositories.Interfaces
{
    public interface ISettingsRepository
    {
        Task<SettingsDto> GetSettingsAsync();
        Task SetSettingsAsync(SettingsDto settingsDto);
    }
}
