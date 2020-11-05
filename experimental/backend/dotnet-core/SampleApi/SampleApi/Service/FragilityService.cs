using SampleApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleApi.Service
{
    public class FragilityService : IFragilityService
    {
        private readonly ConnectionFactory _factory;

        public FragilityService(ConnectionFactory factory)
        {
            _factory = factory;
        }

        public async Task<FragilityMasterData> GetMasterData()
        {
            var regionData = GetRegionMasterData().ToArray();
            var departmentData = GetDepartmentMasterData().ToArray();
            var interCommunalityData = GetInterCommunalityMasterData().ToArray();
            var communeData = GetCommuneMasterData().ToArray();

            return new FragilityMasterData
            {
                Regions = regionData,
                Departments = departmentData,
                InterCommunalities = interCommunalityData,
                Communes = communeData
            };
        }

        private IEnumerable<MasterData> GetRegionMasterData()
        {
            return ReadMasterData("SELECT Id, Name FROM region_master;");
        }

        private IEnumerable<MasterData> GetDepartmentMasterData()
        {
            return ReadMasterData("SELECT Id, Name FROM department_master;");
        }

        private IEnumerable<MasterData> GetInterCommunalityMasterData()
        {
            return ReadMasterData("SELECT Id, Name FROM intercommunalities_master;");
        }

        private IEnumerable<MasterData> GetCommuneMasterData()
        {
            return ReadMasterData("SELECT Id, Name FROM commune_master;");
        }

        private IEnumerable<MasterData> ReadMasterData(string query)
        {
            using var connection = _factory.GetConnection().Result;
            using var command = connection.CreateCommand();
            command.CommandText = query;

            using var reader = command.ExecuteReader();
            while (reader.Read())
            {
                yield return reader.ReadMasterData();
            }
        }
    }
}
