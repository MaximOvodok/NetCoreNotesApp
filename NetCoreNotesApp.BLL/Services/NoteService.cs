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

        private readonly INoteTagService _noteTagService;

        private readonly ITagService _tagService;

        private readonly IMapper _mapper;

        public NoteService(IRepositoryContext context, INoteTagService noteTagService, ITagService tagService, IMapper mapper)
        {
            _context = context;
            _noteTagService = noteTagService;
            _tagService = tagService;
            _mapper = mapper;
        }

        public int CreateNote(NoteDTO note)
        {
            var noteEntity = _mapper.Map<NoteDTO, Note>(note);
            var createdNoteEntity = _context.Notes.Create(noteEntity);
            _context.Commit();

            var createdTags = _tagService.CreateTags(note.Tags);

            foreach (var tag in createdTags)
            {
                var existingRelation = _context.NotesTags.GetAll().FirstOrDefault(nt => nt.NoteId == createdNoteEntity.Id && nt.TagId == tag.Id);

                if (existingRelation == null)
                {
                    _context.NotesTags.Create(new NotesTag { NoteId = createdNoteEntity.Id, TagId = tag.Id });
                }
            }

            _context.Commit();

            return createdNoteEntity.Id;
        }

        public int UpdateNote(NoteDTO note)
        {
            var noteEntity = _mapper.Map<NoteDTO, Note>(note);
            _context.Notes.Update(noteEntity);

            var createdTags = _tagService.CreateTags(note.Tags);
            note.Tags = _mapper.Map<ICollection<Tag>, ICollection<TagDTO>>(createdTags);

            var noteTagConnectionsToAdd = _mapper.Map<IList<NoteTagDTO>, IList<NotesTag>>(_noteTagService.GetRelationshipsToAdd(note));
            var noteTagConnectionsToRemove = _mapper.Map<IList<NoteTagDTO>, IList<NotesTag>>(_noteTagService.GetRelationshipsToDelete(note));

            foreach (var noteTagConnection in noteTagConnectionsToAdd)
            {
                _context.NotesTags.Create(noteTagConnection);
            }

            foreach (var noteTagConnection in noteTagConnectionsToRemove)
            {
                _context.NotesTags.Remove(noteTagConnection);
            }

            _context.Commit();

            var tagsToRemoveIds = noteTagConnectionsToRemove.Select(nt => nt.TagId).Distinct();

            foreach(var tagId in tagsToRemoveIds)
            {
                _tagService.RemoveUnusedTag(tagId);
            }

            return note.Id;
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