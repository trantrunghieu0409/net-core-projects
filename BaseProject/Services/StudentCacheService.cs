using BaseProject.Entity;
using StackExchange.Redis;
using System.Text.Json;

namespace BaseProject.Services
{
    public interface IStudentCacheService
    {
        Task<List<Student>> GetAllAsync(int nStudents = 5);
        Task<Student> GetStudentById(int Id);
        Task AddStudent(Student student);
        List<Student> SyncData();
    }

    public class StudentCacheService: IStudentCacheService
    {
        private readonly IDatabase _db;
        private readonly IStudentService _studentService;
        private readonly string key = "MyStudents";

        public StudentCacheService(IConnectionMultiplexer connection, IStudentService studentService)
        {
            _db = connection.GetDatabase();
            _studentService = studentService;
        }

        public async Task<List<Student>> GetAllAsync(int nStudents = 5)
        {
            RedisValue[]? resultJson;
            var students = new List<Student>();
            try
            {
                int timeout=10;
                var task = Task.Run(async () => await _db.ListRangeAsync(key, -nStudents));
                if (task.Wait(TimeSpan.FromSeconds(timeout))) // wait for 10 seconds 
                    resultJson = task.Result;
                else
                    throw new Exception("Timed out");

                if (resultJson.Length == 0) 
                    throw new Exception("No data");

                foreach (var result in resultJson)
                {
                    var student = JsonSerializer.Deserialize<Student>(result);
                    if (student != null)
                        students.Add(student);
                }
            }
            catch (Exception ex)
            {
                students = SyncData(); // get data from SQL Server and transfer it to redis when there is no data or timeout when using Redis
            }
            return students;
        }

        public async Task<Student> GetStudentById(int Id)
        {
            var resultJson = await _db.ListGetByIndexAsync(key, -Id);
            return JsonSerializer.Deserialize<Student>(resultJson) ?? new Student() { Id = -1 };
        }

        public async Task AddStudent(Student student)
        {
            try
            {
                var jsonStudent = JsonSerializer.Serialize(student);
                await _db.ListLeftPushAsync(key, jsonStudent);
            }
            catch (Exception ex)
            {
                // should handle exception later
            }
        }

        public List<Student> SyncData()
        {
            var students = _studentService.GetAll();
            foreach (var student in students)
                AddStudent(student);
            return students;
        }

    }
}
