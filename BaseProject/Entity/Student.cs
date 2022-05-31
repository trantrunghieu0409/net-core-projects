namespace BaseProject.Entity
{
    public class Student
    {
        public int Id { get; set; }
        public string name { get; set; }
        public int score { get; set; }

        public override string ToString()
        {
            return $"name: {name}; score: {score}";
        }
    }
}
