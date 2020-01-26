using NetCoreNotesApp.BLL.BusinessEntities;
using System.Collections.Generic;

namespace NetCoreNotesApp.BLL.Core
{
    public interface ITagService
    {
        void SetTags(ICollection<TagDTO> tagDTOs);
        IList<TagDTO> SearchTags(string term);
    }
}