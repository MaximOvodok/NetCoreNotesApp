using NetCoreNotesApp.BLL.BusinessEntities;

namespace NetCoreNotesApp.BLL.Core
{
    public interface ITagService
    {
        void EnsureTag(TagDTO tag);
    }
}