using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

public abstract class BaseRepository<T> : IRepository<T> where T: class
{
    public DbContext DbContext { get; set; }
    public DbSet<T> DbSet { get; set; }
    protected BaseRepository(DbContext dbContext)
    {
        if (dbContext == null)
        {
            throw new ArgumentException("dbContext");
        }

        DbContext = dbContext;
        DbSet = DbContext.Set<T>();
    }
    public void Create(T entity)
    {
        DbContext.Entry(entity).State = EntityState.Added;
    }

    public IQueryable<T> GetAll()
    {
        return DbSet;
    }

    public T GetById(int id)
    {
        return DbSet.Find(id);
    }

    public void Remove(int id)
    {
        var entity = GetById(id);
        Remove(entity);
    }

    public void Remove(T entity)
    {
        DbContext.Entry(entity).State = EntityState.Deleted;
    }

    public void Update(T entity)
    {
        DbContext.Entry(entity).State = EntityState.Modified;
    }
}