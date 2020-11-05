using SampleApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleApi.Service
{
    public interface IFragilityService
    {
        Task<FragilityMasterData> GetMasterData();
    }
}
