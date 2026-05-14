namespace Router.Repositories.Interfaces
{
    public interface IChatService
    {
        Task<string> StartChat();
        Task<string> SendMessage(string message);
    }
}
