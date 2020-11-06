using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleApi.Model
{
    public class FragilityMasterData
    {
        public IEnumerable<MasterData> Regions { get; set; }

        public IEnumerable<MasterData> Departments { get; set; }

        public IEnumerable<MasterData> InterCommunalities { get; set; }

        public IEnumerable<MasterData> Communes { get; set; }
    }
}
