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
            var resultJson = await _db.ListRangeAsync(key, -nStudents); // get {nStudent} last students
            var students = new List<Student>();
            foreach (var result in resultJson)
            {
                var student = JsonSerializer.Deserialize<Student>(result);
                if (student != null)
                    students.Add(student);
            }

            if (students.Count == 0)
                students = SyncData();
            
            return students;
        }

        public async Task<Student> GetStudentById(int Id)
        {
            var resultJson = await _db.ListGetByIndexAsync(key, -Id);
            return JsonSerializer.Deserialize<Student>(resultJson) ?? new Student() { Id = -1 };
        }

        public async Task AddStudent(Student student)
        {
            var jsonStudent = JsonSerializer.Serialize(student);
            await _db.ListLeftPushAsync(key, jsonStudent);
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
