using SampleApi.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SampleApi.Service
{
    public interface IFragilityService
    {
        Task<FragilityMasterData> GetMasterData();

        Task<FragilityScoreResponse> GetScore(FragilityRequest request);
    }

}
