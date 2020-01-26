using System.Collections.Generic;
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
        public IList<NoteDTO> Get()
        {
            var notes = _noteService.GetNotes();
            return notes;
        }
        [HttpGet("Severities")]
        public IList<SeverityDTO> GetSeverities()
        {
            var severities = _noteService.GetSeverities();
            return severities;
        }

        [HttpPost("Create")]
        public int Create([FromBody] NoteDTO noteDTO)
        {
            noteDTO.UserId = 1;
            return _noteService.SetNote(noteDTO);
        } 
    }
}
