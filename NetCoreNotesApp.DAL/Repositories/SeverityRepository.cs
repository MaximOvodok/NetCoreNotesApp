using Microsoft.EntityFrameworkCore;
using NetCoreNotesApp.DAL.Entities;
using NetCoreNotesApp.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace NetCoreNotesApp.DAL.Repositories
{
    public class SeverityRepository : BaseRepository<Severity>, ISeverityRepository
    {
        public SeverityRepository(DbContext dbContext) : base(dbContext)
        {
        }
    }
}
