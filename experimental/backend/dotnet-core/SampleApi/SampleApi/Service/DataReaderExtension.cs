using Microsoft.Data.Sqlite;
using SampleApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleApi.Service
{
    public static class DataReaderExtension
    {
        public static MasterData ReadMasterData(this SqliteDataReader reader)
        {
            var data = new MasterData();
            data.Id = reader.GetInt32(0);
            if (!reader.IsDBNull(1))
            {
                data.Name = reader.GetString(1);
            }

            return data;
        }

        public static FragilityScore ReadFragilityScore(this SqliteDataReader reader)
        {
            var data = new FragilityScore();
            if (!reader.IsDBNull(0))
            {
                data.NomCom = reader.GetString(0);
            }

            if (!reader.IsDBNull(1))
            {
                data.CodeIris = reader.GetString(1);
            }

            if (!reader.IsDBNull(3))
            {
                data.NomIris = reader.GetString(3);
            }

            data.ScoreRank = reader.GetInt32(2);
            data.PopulationScore = reader.GetDecimal(4);
            data.ScoreGlobal = reader.GetDecimal(5);
            data.AccessAuxInterfaceNumber = reader.GetDecimal(6);
            data.AccessInformation = reader.GetDecimal(7);
            data.CompetenceAdministrative = reader.GetDecimal(8);
            data.CompetenceSolaris = reader.GetDecimal(9);
            data.GlobalAccess = reader.GetDecimal(10);
            data.GlobalCompetence = reader.GetDecimal(11);


            return data;
        }
    }
}
