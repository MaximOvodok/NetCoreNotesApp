using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using NetCoreNotesApp.BLL.BusinessEntities;
using NetCoreNotesApp.BLL.Core;

namespace NetCoreNotesApp.Web.Controllers
{
    [Route("api/Tags")]
    [ApiController]
    public class TagController : Controller
    {
        private readonly ITagService _tagService;
        public TagController(ITagService tagService)
        {
            _tagService = tagService;
        }

        [HttpGet("Search")]
        public IQueryable<TagDTO> Search(string term)
        {
            return _tagService.SearchTags(term);
        }

        [HttpPost("Push")]
        public void Push(ICollection<TagDTO> tagDTOs)
        {
            _tagService.CreateTags(tagDTOs);
        }
    }
}