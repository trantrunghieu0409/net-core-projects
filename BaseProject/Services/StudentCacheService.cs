using StackExchange.Redis;

namespace BaseProject.Services
{
    public class StudentCacheService
    {
        private readonly string key = "MyStudent";
        private readonly IDatabase _db;

        public StudentCacheService(IDatabase db)
        {
            _db = db;
        }
    }
}
