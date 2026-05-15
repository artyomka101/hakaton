using Microsoft.Extensions.Options;
using Router.Repositories.Models;
using System.Net.Http.Headers;
using Router.Repositories.Interfaces;
using Router.Settings;

namespace Router.Repositories.Implementations
{
    public class HttpChatApiClient : IChatApiClient
    {
        private readonly HttpClient _httpClient;
        private readonly ChatApiSettings _chatSettings;
        private readonly ILogger<HttpChatApiClient> _logger;
        private readonly List<OpenApiResponse.Message> _history = new List<OpenApiResponse.Message>();

        public HttpChatApiClient(HttpClient httpClient, IOptions<ChatApiSettings> chatOptions, ILogger<HttpChatApiClient> logger)
        {
            _chatSettings = chatOptions.Value;
            _httpClient = httpClient;
            _logger = logger;

            _httpClient.BaseAddress = new Uri(_chatSettings.BaseUrl);
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _chatSettings.ApiKey);
            
        }

        public Task ClearHistoryAsync()
        {
            _history.Clear();
            return Task.CompletedTask;
        }

        public async Task<string> SendMessageAsync(string userMessage)
        {
            _history.Add(new OpenApiResponse.Message { Content = userMessage, Role = "user" });
            _logger.LogInformation("Отправка запроса к модели {Model}", _chatSettings.DefaultModel);

            var payload = new OpenApiRequest()
            {
                Model = _chatSettings.DefaultModel,
                Messages = _history,
                MaxTokens = 5000
            };

            var response = await _httpClient.PostAsJsonAsync("", payload);
            response.EnsureSuccessStatusCode();

            var body = await response.Content.ReadFromJsonAsync<OpenApiResponse?>();
            if (body?.Choices != null && body.Choices.Length > 0)
            {
                var content = body.Choices[0].Message.Content;
                _logger.LogInformation("Получен ответ от API: {Content}", content);
                _history.Add(new OpenApiResponse.Message { Content = content, Role = "assistant" });
                return content;
            }

            _logger.LogWarning("API вернул пустой ответ");
            var result = await response.Content.ReadAsStringAsync();
            return result;
        }
    }
}
