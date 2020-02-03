using System;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using NetCoreNotesApp.DAL.Interfaces;

namespace NetCoreNotesApp.DAL.Repositories
{
    public abstract class BaseRepository<T> : IRepository<T> where T : class
    {
        protected DbContext DbContext { get; set; }

        protected DbSet<T> DbSet { get; set; }

        protected BaseRepository(DbContext dbContext)
        {
            DbContext = dbContext ?? throw new ArgumentException("dbContext");
            DbSet = DbContext.Set<T>();
        }

        public T Create(T entity)
        {
            DbContext.Entry(entity).State = EntityState.Added;
            return entity;
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
}