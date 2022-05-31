using BaseProject.Entity;
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

        public RedisController(IConnectionMultiplexer connection)
        {
            _db = connection.GetDatabase();
        }

        [HttpGet]
        public async Task<string> GetAsync()
        {
            string key = "MyObject";

            string[] names = { "David", "Helen", "Alan", "Peter", "Parker" };
            int[] scores = { 5, 6, 7, 8, 9 };

            Student[] students = new Student[names.Length];
            for (int i = 0; i < names.Length; i++)
                students[i] = new Student(names[i], scores[i]);

            // Method 1: using String + serialize/deserialize 
            await _db.StringSetAsync(key, JsonSerializer.Serialize(students));
            var resultJson = await _db.StringGetAsync(key);

            var newStudents = JsonSerializer.Deserialize<Student[]>(resultJson);
            
            return newStudents[0].ToString();
        }
    }
}
