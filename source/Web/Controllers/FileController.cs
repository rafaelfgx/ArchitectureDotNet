using Architecture.Application;
using DotNetCore.AspNetCore;
using DotNetCore.Objects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Architecture.Web
{
    [ApiController]
    [Route("files")]
    public sealed class FileController : ControllerBase
    {
        private readonly string _directory;
        private readonly IFileService _fileService;

        public FileController
        (
            IFileService fileService,
            IHostEnvironment environment
        )
        {
            _directory = Path.Combine(environment.ContentRootPath, "Files");
            _fileService = fileService;
        }

        [DisableRequestSizeLimit]
        [HttpPost]
        public Task<IEnumerable<BinaryFile>> AddAsync() => _fileService.AddAsync(_directory, Request.Files());

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult Get(Guid id) => _fileService.GetAsync(_directory, id).FileResult();
    }
}
