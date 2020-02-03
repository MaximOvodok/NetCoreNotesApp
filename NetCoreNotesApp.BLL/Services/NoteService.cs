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
                var newNote = _context.Notes.Create(noteEntity);
                _context.Commit();

                var tags = _tagService.SetTags(note.Tags);

                foreach (var tag in tags)
                {
                    var existingRelation = _context.NotesTags.GetAll().FirstOrDefault(nt => nt.NoteId == newNote.Id && nt.TagId == tag.Id);

                    if (existingRelation == null)
                    {
                        _context.NotesTags.Create(new NotesTag { NoteId = newNote.Id, TagId = tag.Id });
                    }
                }

                _context.Commit();
            }

            return noteEntity.Id;
        }

        public IQueryable<NoteDTO> GetNotes()
        {
            var noteEntities = _context.Notes.GetAll()
                .Include(_ => _.Severity)
                .Include(_ => _.NotesTags)
                .ThenInclude(_ => _.Tag);

            return _mapper.ProjectTo<NoteDTO>(noteEntities);
        }

        public IQueryable<SeverityDTO> GetSeverities()
        {
            var severityEntities = _context.Severities.GetAll();
            return _mapper.ProjectTo<SeverityDTO>(severityEntities);
        }
    }
}