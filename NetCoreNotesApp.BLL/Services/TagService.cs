using AutoMapper;
using AutoMapper.QueryableExtensions;
using NetCoreNotesApp.BLL.BusinessEntities;
using NetCoreNotesApp.BLL.Core;
using NetCoreNotesApp.DAL.Core;
using NetCoreNotesApp.DAL.Entities;
using System.Collections.Generic;
using System.Linq;

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

        public IQueryable<TagDTO> SearchTags(string term)
        {
            var query = _context.Tags.GetAll();

            query = !string.IsNullOrEmpty(term)
                ? query.Where(t => t.Name.StartsWith(term))
                : query.Take(10);

            return query.ProjectTo<TagDTO>(_mapper.ConfigurationProvider);
        }

        public ICollection<Tag> SetTags(ICollection<TagDTO> tagDTOs)
        {
            var tags = new List<Tag>();

            foreach (var tagDTO in tagDTOs)
            {
                var tag = _mapper.Map<TagDTO, Tag>(tagDTO);

                if (!(tag.Id > 0))
                {
                    _context.Tags.Create(tag);
                }

                tags.Add(tag);
            }

            _context.Commit();

            return tags;
        }
    }
}