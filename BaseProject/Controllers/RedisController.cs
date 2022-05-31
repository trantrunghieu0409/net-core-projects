using BaseProject.Entity;
using BaseProject.Helpers;
using BaseProject.Services;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;
using System.Text.Json;

namespace BaseProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RedisController: Controller
    {
        private readonly IStudentService _studentService;
        private readonly IStudentCacheService _studentCacheService;

        public RedisController(IStudentService studentService, IStudentCacheService studentCacheService)
        {
            _studentService = studentService;
            _studentCacheService = studentCacheService;
        }

        [HttpGet]
        public async Task<Student[]> GetAsync()
        {
            var students = await _studentCacheService.GetAllAsync();
            return students.ToArray();
        }

        [HttpPost]
        public async Task<IActionResult> AddStudent(Student student)
        {
            _studentService.AddStudent(student);
            await _studentCacheService.AddStudent(student);

            return Ok(student);
        }
    }
}
