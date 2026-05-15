using Microsoft.AspNetCore.Mvc;
using Router.Repositories.Interfaces;

namespace Router.Controllers
{
    [ApiController]
    [Route("api/chat")]
    public class ChatTestController(IChatService chatService): ControllerBase
    {
        [HttpPost("chat")]
        public async Task<IActionResult> Chat([FromBody] ChatTestRequest request)
        {
            var answer = await chatService.SendMessage(request.Message);
            return Ok(new { answer });
        }

        [HttpPost("start")]
        public async Task<IActionResult> Start()
        {
            var result = await chatService.StartChat();
            return Ok(result);
        }
    }
    public record ChatTestRequest(string Message);
}
