using System.Linq;

namespace NetCoreNotesApp.DAL.Interfaces
{
    public interface IRepository<T>
    {
        IQueryable<T> GetAll();

        T GetById(int id);

        T Create(T entity);

        void Update(T entity);

        void Remove(int id);

        void Remove(T entity);
    }
}