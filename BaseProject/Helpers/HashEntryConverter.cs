using Newtonsoft.Json;
using StackExchange.Redis;
using System.Reflection;

namespace BaseProject.Helpers
{
    public class HashEntryConverter
    {
        public static HashEntry[] ToHashEntries(object obj)
        {
            PropertyInfo[] properties = obj.GetType().GetProperties();
            return properties
                .Where(x => x.GetValue(obj) != null) // <-- PREVENT NullReferenceException
                .Select
                (
                      property =>
                      {
                          object propertyValue = property.GetValue(obj);
                          string hashValue;

                      // This will detect if given property value is 
                      // enumerable, which is a good reason to serialize it
                      // as JSON!
                      if (propertyValue is IEnumerable<object>)
                          {
                          // So you use JSON.NET to serialize the property
                          // value as JSON
                          hashValue = JsonConvert.SerializeObject(propertyValue);
                          }
                          else
                          {
                              hashValue = propertyValue.ToString() ?? "";
                          }

                          return new HashEntry(property.Name, hashValue);
                      }
                )
                .ToArray();
        }

        public static T ConvertFromRedis<T>(HashEntry[] hashEntries)
        {
            PropertyInfo[] properties = typeof(T).GetProperties();
            var obj = Activator.CreateInstance(typeof(T));
            foreach (var property in properties)
            {
                HashEntry entry = hashEntries.FirstOrDefault(g => g.Name.ToString().Equals(property.Name));
                if (entry.Equals(new HashEntry())) continue;
                object? propValue;
                if (property.PropertyType.IsEnum)
                {
                    propValue = Enum.Parse(property.PropertyType, entry.Value.ToString(), true);
                }
                else
                {
                    propValue = Convert.ChangeType(entry.Value.ToString(), property.PropertyType);
                }

                property.SetValue(obj, propValue);
            }
            return (T)obj;
        }
    }
}
