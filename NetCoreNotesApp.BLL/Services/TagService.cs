using AutoMapper;
using NetCoreNotesApp.BLL.BusinessEntities;
using NetCoreNotesApp.BLL.Core;
using NetCoreNotesApp.DAL.Core;
using NetCoreNotesApp.DAL.Entities;
using NetCoreNotesApp.DAL.Interfaces;

namespace NetCoreNotesApp.BLL.Services
{
    public class TagService : ITagService
    {
        private readonly IRepositoryContext _context;
        private readonly IMapper _mapper;
        public TagService(IRepositoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public void EnsureTag(TagDTO tag)
        {
            var tagEntity = _mapper.Map<TagDTO, Tag>(tag);

            if (tagEntity.Id > 0)
            {
                _context.Tags.Update(tagEntity);
            }
            else
            {
                _context.Tags.Create(tagEntity);
            }

            _context.Commit();
        }
    }
}