using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NetCoreNotesApp.BLL.BusinessEntities;
using NetCoreNotesApp.BLL.Core;
using NetCoreNotesApp.DAL.Core;
using NetCoreNotesApp.DAL.Entities;

namespace NetCoreNotesApp.BLL.Services
{
    public class NoteService : INoteService
    {
        private readonly IRepositoryContext _context;
        private readonly ITagService _tagService;
        private readonly IMapper _mapper;
        public NoteService(IRepositoryContext context, ITagService tagService, IMapper mapper)
        {
            _context = context;
            _tagService = tagService;
            _mapper = mapper;
        }

        public int SetNote(NoteDTO note)
        {
            var noteEntity = _mapper.Map<NoteDTO, Note>(note);
            if (noteEntity.Id > 0)
            {
                _context.Notes.Update(noteEntity);
            }
            else
            {
                _context.Notes.Create(noteEntity);
            }

            _context.Commit();

            return noteEntity.Id;
        }

        public IList<NoteDTO> GetNotes()
        {
            var noteEntities = _context.Notes.GetAll().Include(n => n.Severity).Include(n => n.Tags).ToList();
            return _mapper.Map<IList<Note>, IList<NoteDTO>>(noteEntities);
        }

        public IList<SeverityDTO> GetSeverities()
        {
            var severityEntities = _context.Severities.GetAll().ToList();
            return _mapper.Map<IList<Severity>, IList<SeverityDTO>>(severityEntities);
        }
    }
}