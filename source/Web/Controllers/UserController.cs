using Architecture.Application;
using Architecture.Model;
using DotNetCore.AspNetCore;
using DotNetCore.Objects;
using Microsoft.AspNetCore.Mvc;

namespace Architecture.Web
{
    [ApiController]
    [Route("users")]
    public sealed class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService) => _userService = userService;

        [HttpPost]
        public IActionResult Add(UserModel model) => _userService.AddAsync(model).ApiResult();

        [HttpDelete("{id}")]
        public IActionResult Delete(long id) => _userService.DeleteAsync(id).ApiResult();

        [HttpGet("{id}")]
        public IActionResult Get(long id) => _userService.GetAsync(id).ApiResult();

        [HttpGet("grid")]
        public IActionResult Grid([FromQuery] GridParameters parameters) => _userService.GridAsync(parameters).ApiResult();

        [HttpPatch("{id}/inactivate")]
        public IActionResult Inactivate(long id) => _userService.InactivateAsync(id).ApiResult();

        [HttpGet]
        public IActionResult List() => _userService.ListAsync().ApiResult();

        [HttpPut("{id}")]
        public IActionResult Update(UserModel model) => _userService.UpdateAsync(model).ApiResult();
    }
}
