namespace BaseProject.Entity
{
    public class Student
    {
        public string name { get; set; }
        public int score { get; set; }

        public Student(string name, int score)
        {
            this.name = name;
            this.score = score;
        }

        public Student()
        {
        }

        public void set(string name, int score)
        {
            this.name = name;
            this.score = score;
        }

        public override string ToString()
        {
            return $"name: {name}; score: {score}";
        }
    }
}
