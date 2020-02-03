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
        ITagService _tagService;
        public TagController(ITagService tagService)
        {
            _tagService = tagService;
        }
        [HttpGet("Search")]
        public IQueryable<TagDTO> Search(string term)
        {
            var tags = _tagService.SearchTags(term);
            return tags;
        }
        [HttpPost("Push")]
        public void Push(ICollection<TagDTO> tagDTOs)
        {
            _tagService.SetTags(tagDTOs);
        }
    }
}