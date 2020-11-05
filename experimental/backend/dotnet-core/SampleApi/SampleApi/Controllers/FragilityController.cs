using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SampleApi.Model;
using SampleApi.Service;

namespace SampleApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FragilityController : ControllerBase
    {
        public static readonly Random rnd = new Random();

        private readonly ILogger<FragilityController> _logger;
        private readonly IFragilityService _service;

        public FragilityController(ILogger<FragilityController> logger, IFragilityService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        [Route("filterdata")]
        public async Task<FragilityMasterData> FilterData()
        {
            return await _service.GetMasterData();
        }

        [HttpPost]
        public SampleResponse Post(FragilityRequest request)
        {
            var response = new SampleResponse();
            var data = new string[1000];
            for (int i = 0; i < 1000; i++)
            {
                data[i] = "";
            }
            response.Data = data;

            return response;
        }
        
    }
}
