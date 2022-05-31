using BaseProject.Entity;
using StackExchange.Redis;
using System.Text.Json;

namespace BaseProject.Services
{
    public interface IStudentCacheService
    {
        Task<Student[]> GetAllAsync();
        Task<Student> GetStudentById(int Id);
        Task AddStudent(Student student);
    }

    public class StudentCacheService: IStudentCacheService
    {
        private readonly IDatabase _db;
        private readonly string key = "MyStudent";

        public StudentCacheService(IConnectionMultiplexer connection)
        {
            _db = connection.GetDatabase();
        }

        public async Task<Student[]> GetAllAsync()
        {
            var resultJson = await _db.StringGetAsync(key);

            return JsonSerializer.Deserialize<Student[]>(resultJson);
        }

        public async Task<Student> GetStudentById(int Id)
        {
            Student[] students = await GetAllAsync();
            return students.SingleOrDefault(x => x.Id == Id);
        }

        public async Task AddStudent(Student student)
        {
            var students = new List<Student>(await GetAllAsync());
            students.Add(student);
            await _db.StringSetAsync(key, JsonSerializer.Serialize(students));
        }
    }
}
