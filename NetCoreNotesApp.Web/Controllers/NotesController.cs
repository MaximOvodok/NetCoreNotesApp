using System.Linq;
using Microsoft.AspNetCore.Mvc;
using NetCoreNotesApp.BLL.BusinessEntities;
using NetCoreNotesApp.BLL.Core;

namespace NetCoreNotesApp.Web.Controllers
{
    [Route("api/[controller]")]
    public class NotesController : Controller
    {
        private readonly INoteService _noteService;
        public NotesController(INoteService noteService)
        {
            _noteService = noteService;
        }

        [HttpGet("Get")]
        public IQueryable<NoteDTO> Get()
        {
            return _noteService.GetNotes();
        }

        [HttpGet("Severities")]
        public IQueryable<SeverityDTO> GetSeverities()
        {
            return _noteService.GetSeverities();
        }

        [HttpPost("Create")]
        public int Create([FromBody] NoteDTO noteDTO)
        {
            noteDTO.UserId = 1;

            if (noteDTO.Id > 0)
            {
                return _noteService.UpdateNote(noteDTO);
            }
            
            return _noteService.CreateNote(noteDTO);
        } 
    }
}
