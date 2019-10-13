using System.Linq;

public interface IRepository<T>
{
    IQueryable<T> GetAll();
    T GetById(int id);
    void Create(T entity);
    void Update(T entity);
    void Remove(int id);
}