namespace BaseProject.Authorization
{
    [AttributeUsage(AttributeTargets.Method)]
    public class AllowAnonymousAttribute: Attribute
    {
    }
}
