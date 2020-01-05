using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NetCoreNotesApp.BLL.BusinessEntities;
using NetCoreNotesApp.BLL.Core;
using NetCoreNotesApp.DAL.Entities;
using NetCoreNotesApp.DAL.Interfaces;

namespace NetCoreNotesApp.BLL.Services
{
    public class NoteService : INoteService
    {
        private readonly INoteRepository _noteRepository;
        private readonly ISeverityRepository _severityRepository;
        private readonly IMapper _mapper;
        public NoteService(INoteRepository noteRepository, ISeverityRepository severityRepository, IMapper mapper)
        {
            _noteRepository = noteRepository;
            _severityRepository = severityRepository;
            _mapper = mapper;
        }

        public void EnsureNote(NoteDTO note)
        {
            var noteEntity = _mapper.Map<NoteDTO, Note>(note);
            if (noteEntity.Id > 0)
            {
                _noteRepository.Update(noteEntity);
            }
            else
            {
                _noteRepository.Create(noteEntity);
            }
        }

        public IList<NoteDTO> GetNotes()
        {
            var noteEntities = _noteRepository.GetAll().Include(n => n.Severity).Include(n=>n.Tags).ToList();
            return _mapper.Map<IList<Note>, IList<NoteDTO>>(noteEntities);
        }

        public IList<SeverityDTO> GetSeverities()
        {
            var severityEntities = _severityRepository.GetAll().ToList();
            return _mapper.Map<IList<Severity>, IList<SeverityDTO>>(severityEntities);
        }
    }
}