using SampleApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        public async Task<FragilityScoreResponse> GetScore(FragilityRequest request)
        {
            request.PageSize = 100;
            var query = BuildQueryString(request);

            using var connection = await _factory.GetConnection();
            using var command = connection.CreateCommand();
            command.CommandText = query;
            command.CommandType = System.Data.CommandType.Text;

            using var reader = await command.ExecuteReaderAsync();
            var items = new List<FragilityScore>(request.PageSize);
            while (reader.Read())
            {
                items.Add(reader.ReadFragilityScore());
            }

            return new FragilityScoreResponse
            {
                Scores = items,
                TotalRecords = request.PageSize
            };
        }

        private static string BuildQueryString(FragilityRequest request, bool isCount = false)
        {
            var builder = new StringBuilder();
            builder.Append(@"SELECT
	PROJECTION_COLUMNS
FROM
	fragility_score
");

            

            if (!isCount)
            {
                builder.Replace("PROJECTION_COLUMNS", @"NomCom,
	CodeIris,
	RANK() OVER(ORDER BY SCORE_GLOBAL_COLUMN DESC) ScoreRank,
	NomIris,
	PopulationScore,
	SCORE_GLOBAL_COLUMN AS ScoreGlobal,
	AccessAuxInterfaceNumber_COLUMN AS AccessAuxInterfaceNumber,
	AccessInformation_COLUMN AS AccessInformation,
	CompetenceAdministrative_COLUMN AS CompetenceAdministrative,
	CompetenceSolaris_COLUMN AS CompetenceSolaris,
	GlobalAccess_COLUMN AS GlobalAccess,
	GlobalCompetence_COLUMN AS GlobalCompetence");

                switch (request.ReferencePoint)
                {
                    case ReferencePointEnum.Department:
                        builder.Replace("SCORE_GLOBAL_COLUMN", "ScoreGlobalDepartment");
                        builder.Replace("AccessAuxInterfaceNumber_COLUMN", "AccessAuxInterfaceNumberDepartment");
                        builder.Replace("AccessInformation_COLUMN", "AccessInformationDepartment");
                        builder.Replace("CompetenceAdministrative_COLUMN", "CompetenceAdministrativeDepartment");
                        builder.Replace("CompetenceSolaris_COLUMN", "CompetenceSolarisDepartment");
                        builder.Replace("GlobalAccess_COLUMN", "GlobalAccessDepartment");
                        builder.Replace("GlobalCompetence_COLUMN", "GlobalCompetenceDepartment");
                        break;

                    case ReferencePointEnum.Intercommunality:
                        builder.Replace("SCORE_GLOBAL_COLUMN", "ScoreGlobalCommunal");
                        builder.Replace("AccessAuxInterfaceNumber_COLUMN", "AccessAuxInterfaceNumberCommunal");
                        builder.Replace("AccessInformation_COLUMN", "AccessInformationCommunal");
                        builder.Replace("CompetenceAdministrative_COLUMN", "CompetenceAdministrativeCommunal");
                        builder.Replace("CompetenceSolaris_COLUMN", "CompetenceSolarisCommunal");
                        builder.Replace("GlobalAccess_COLUMN", "GlobalAccessCommunal");
                        builder.Replace("GlobalCompetence_COLUMN", "GlobalCompetenceCommunal");
                        break;

                    default:
                        builder.Replace("SCORE_GLOBAL_COLUMN", "ScoreGlobalRegion");
                        builder.Replace("AccessAuxInterfaceNumber_COLUMN", "AccessAuxInterfaceNumberRegion");
                        builder.Replace("AccessInformation_COLUMN", "AccessInformationRegion");
                        builder.Replace("CompetenceAdministrative_COLUMN", "CompetenceAdministrativeRegion");
                        builder.Replace("CompetenceSolaris_COLUMN", "CompetenceSolarisRegion");
                        builder.Replace("GlobalAccess_COLUMN", "GlobalAccessRegion");
                        builder.Replace("GlobalCompetence_COLUMN", "GlobalCompetenceRegion");
                        break;
                }
            }
            else
            {
                builder.Replace("PROJECTION_COLUMNS", "COUNT(*)");
            }

            if (!isCount)
            {
                builder.AppendLine(@$"ORDER BY 
	NomCom ASC
LIMIT {request.PageSize};");
            }

            return builder.ToString();
        }

        #region Filter Data

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
                //Communes = communeData
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

        #endregion
    }
}
