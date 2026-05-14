using Router.Repositories.Models;

namespace Router.Repositories.Interfaces
{
    public interface IChatApiClient
    {
        Task<string> SendMessageAsync(string userMessage);
        Task ClearHistoryAsync();
    }
}
