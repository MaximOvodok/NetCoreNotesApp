using NetCoreNotesApp.BLL.BusinessEntities;
using NetCoreNotesApp.DAL.Entities;
using System.Collections.Generic;
using System.Linq;

namespace NetCoreNotesApp.BLL.Core
{
    public interface ITagService
    {
        ICollection<Tag> SetTags(ICollection<TagDTO> tagDTOs);
        IQueryable<TagDTO> SearchTags(string term);
    }
}