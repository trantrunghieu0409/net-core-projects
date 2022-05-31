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
        private readonly IDatabase _db;
        private readonly IStudentService _studentService;
        private readonly string key = "MyStudent";

        public RedisController(IConnectionMultiplexer connection, IStudentService studentService)
        {
            _db = connection.GetDatabase();
            _studentService = studentService;
        }

        [HttpGet]
        public async Task<string> GetAsync()
        {

            //string[] names = { "David", "Helen", "Alan", "Peter", "Parker" };
            //int[] scores = { 5, 6, 7, 8, 9 };

            //Student[] students = new Student[names.Length];
            //for (int i = 0; i < names.Length; i++)
            //{
            //    students[i] = new Student() {  name = names[i], score = scores[i] };
            //    _studentService.AddStudent(students[i]);
            //}

            var students = _studentService.GetAll();

            

            var resultJson = await _db.StringGetAsync(key);

            var newStudents = JsonSerializer.Deserialize<Student[]>(resultJson);
            
            return newStudents[0].ToString();
        }

        [HttpPost]
        public async Task<IActionResult> AddStudent(Student student)
        {
            _studentService.AddStudent(student);
            await _db.StringSetAsync(key, JsonSerializer.Serialize(students));

            return Ok(student);
        }
    }
}
