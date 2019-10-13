using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NetCoreNotesApp.Web.Models;

namespace NetCoreNotesApp.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly INoteService _noteService;
        public HomeController(INoteService noteService)
        {
            _noteService = noteService;
        }
        public IActionResult Index()
        {
            var notes = _noteService.GetNotes();
            return View(notes.Count);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
