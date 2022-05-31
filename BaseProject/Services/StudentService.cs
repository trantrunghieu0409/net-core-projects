using BaseProject.Entity;
using BaseProject.Helpers;

namespace BaseProject.Services
{
    public interface IStudentService
    {
        List<Student> GetAll();
        Student GetStudentById(int Id);

        void AddStudent(Student student);
    }

    public class StudentService : IStudentService
    {
        private readonly DataContext _dataContext;

        public StudentService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void AddStudent(Student student)
        {
            _dataContext.Students.Add(student);

            _dataContext.SaveChanges();
        }

        public List<Student> GetAll()
        {
            return new List<Student>(_dataContext.Students);
        }

        public Student GetStudentById(int Id)
        {
            return _dataContext.Students.SingleOrDefault(x => x.Id == Id);
        }
    }
}
