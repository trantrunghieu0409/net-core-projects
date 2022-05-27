using BaseProject.Entities;
using BaseProject.Models;
using AutoMapper;

namespace BaseProject.Helpers
{
    public class AutoMapperProfile : Profile
    {
        // mappings between model and entity objects
        public AutoMapperProfile()
        {
            CreateMap<Account, AccountResponse>();

            CreateMap<Account, AuthenticateResponse>();

            CreateMap<CreateRequest, Account>();

            CreateMap<RegisterRequest, Account>();

            CreateMap<UpdateRequest, Account>()
                .ForAllMembers(x => x.Condition(
                    (src, dest, prop) =>
                    {
                        if (prop == null) return false;
                        if (prop.GetType() == typeof(string) && string.IsNullOrEmpty((string)prop)) return false;

                        if (x.DestinationMember.Name == "Role" && src.Role == null) return false;

                        return true;
                    }
                    ));
        }
    }
}
