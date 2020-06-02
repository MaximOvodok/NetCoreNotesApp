using AutoMapper;
using AutoMapper.QueryableExtensions;
using NetCoreNotesApp.BLL.BusinessEntities;
using NetCoreNotesApp.BLL.Core;
using NetCoreNotesApp.BLL.Utils;
using NetCoreNotesApp.DAL.Core;
using System.Collections.Generic;
using System.Linq;

namespace NetCoreNotesApp.BLL.Services
{
    public class NoteTagService: INoteTagService
    {
        private readonly IRepositoryContext _context;

        private readonly IMapper _mapper;

        public NoteTagService(IRepositoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IList<NoteTagDTO> GetRelationshipsToAdd(NoteDTO note)
        {
            var existingRelationships = _context.NotesTags.GetAll().ProjectTo<NoteTagDTO>(_mapper.ConfigurationProvider).ToList();

            var currentRelationships = new List<NoteTagDTO>();

            foreach (var tag in note.Tags)
            {
                currentRelationships.Add(new NoteTagDTO
                {
                    NoteId = note.Id,
                    TagId = tag.Id
                });
            }

            return currentRelationships.Except(existingRelationships, new NoteTagPairComparer()).ToList();
        }

        public IList<NoteTagDTO> GetRelationshipsToDelete(NoteDTO note)
        {
            var existingRelationships = _context.NotesTags.GetAll().ProjectTo<NoteTagDTO>(_mapper.ConfigurationProvider).Where(r => r.NoteId == note.Id).ToList();

            var currentRelationships = new List<NoteTagDTO>();

            foreach (var tag in note.Tags)
            {
                currentRelationships.Add(new NoteTagDTO
                {
                    NoteId = note.Id,
                    TagId = tag.Id
                });
            }

            return existingRelationships.Except(currentRelationships, new NoteTagPairComparer()).ToList();
        }
    }
}
