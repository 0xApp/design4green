using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SampleApi.Model;

namespace SampleApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        public static readonly Random rnd = new Random();

        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public SampleResponse Get()
        {
            var response = new SampleResponse();
            var data = new string[1000];
            for (int i = 0; i < 1000; i++)
            {
                data[i] = RandomString(50);
            }
            response.Data = data;

            return response;
        }

        private static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var rndChars = new char[length];
            for (int i = 0; i < length; i++)
            {
                rndChars[i] = chars[rnd.Next(0, length)];
            }
            return new string(rndChars);
        }
    }
}
