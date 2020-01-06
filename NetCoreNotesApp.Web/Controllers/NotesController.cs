using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using NetCoreNotesApp.BLL.BusinessEntities;
using NetCoreNotesApp.BLL.Core;
using NetCoreNotesApp.Web.Models;
using Newtonsoft.Json;

namespace NetCoreNotesApp.Web.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
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
        public void Create([FromBody] NoteDTO noteDTO)
        {
            noteDTO.UserId = 1;
            _noteService.EnsureNote(noteDTO);
        } 
    }
}
