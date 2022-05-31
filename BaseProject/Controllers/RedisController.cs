using BaseProject.Entity;
using BaseProject.Helpers;
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

            // Method 2: using HashSet to hash an object (can develop to hash a list of object though)
            string key2 = "MyHash";
            await _db.HashSetAsync(key2, HashEntryConverter.ToHashEntries(students[0]));

            var hashResult = await _db.HashGetAllAsync(key2);
            var newHashStudent = HashEntryConverter.ConvertFromRedis<Student>(hashResult); 


            
            return newHashStudent.ToString();
        }
    }
}
