using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleApi.Model
{
    public class FragilityScoreResponse
    {
        public IEnumerable<FragilityScore> Scores { get; set; }

        public int TotalRecords { get; set; }
    }
}
