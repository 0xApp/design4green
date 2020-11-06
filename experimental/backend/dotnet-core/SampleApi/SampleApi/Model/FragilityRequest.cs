using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleApi.Model
{
    public class FragilityRequest
    {
        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public bool Calcul { get; set; }

        public decimal ScoreMinValue { get; set; }

        public decimal ScoreMaxValue { get; set; }

        public ReferencePointEnum ReferencePoint { get; set; }

        public FilterModel<int> Region { get; set; }

        public FilterModel<int> Department { get; set; }

        public FilterModel<int> Intercommnality { get; set; }

        public FilterModel<int> Commune { get; set; }
    }
}
