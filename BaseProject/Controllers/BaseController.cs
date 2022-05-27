using BaseProject.Authorization;
using BaseProject.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BaseProject.Controllers
{
    [Authorize]
    public abstract class BaseController: ControllerBase
    {
        public Account Account => (Account)HttpContext.Items["Account"];
    }
}
