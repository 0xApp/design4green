using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;
using System.Linq;
using System.Collections.Generic;

namespace migrator
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            var builder = new SqliteConnectionStringBuilder();
            builder.DataSource = "./data.db";

            var connection = new SqliteConnection(builder.ConnectionString);
            await connection.OpenAsync();

            // var command = connection.CreateCommand();
            // command.CommandText = "CREATE TABLE Hello(Id INTEGER PRIMARY KEY);";
            // await command.ExecuteNonQueryAsync();

            var csvPath = @"E:\design4green\data\dump_all_columns.csv";
            var lines = File.ReadLines(csvPath);

            const int NomComIndex = 0;
            const int CodeIrisIndex = 1;
            const int NomIrisIndex = 2;
            const int DonneesInfraCommunalIndex = 3;
            const int LibCommuneIndex = 4;
            const int LibDepartmentIndex = 5;
            const int LibInterCommunalityIndex = 6;
            const int LibRegionIndex = 7;
            
            
            
            const int PopulationScoreIndex = 8;

            const int ScoreGlobalRegionIndex = 9;
            const int ScoreGlobalDepartmentIndex = 128;
            const int ScoreGlobalCommunalIndex = 131;

            const int AccessAuxInterfaceNumberRegionIndex = 49;
            const int AccessAuxInterfaceNumberDepartmentIndex = 43;
            const int AccessAuxInterfaceNumberCommunalIndex = 46;

            const int AccessInformationRegionIndex = 40;
            const int AccessInformationDepartmentIndex = 33;
            const int AccessInformationCommunalIndex = 37;

            const int GlobalAccessRegionIndex = 101;
            const int GlobalAccessDepartmentIndex = 95;
            const int GlobalAccessCommunalIndex = 98;

            const int GlobalCompetencRegionIndex = 110;
            const int GlobalCompetencDepartmentIndex = 104;
            const int GlobalCompetencCommunalIndex = 107;

            const int CompetenceAdministrativeRegionIndex = 80;
            const int CompetenceAdministrativeDepartmentIndex = 74;
            const int CompetenceAdministrativeCommunalIndex = 77;

            const int CompetenceSolarisRegionIndex = 89;
            const int CompetenceSolarisDepartmentIndex = 83;
            const int CompetenceSolarisCommunalIndex = 86;

            var scoreColumns = new Dictionary<int, string>();

            scoreColumns.Add(ScoreGlobalRegionIndex, "ScoreGlobalRegion");
            scoreColumns.Add(ScoreGlobalDepartmentIndex, "ScoreGlobalDepartment");
            scoreColumns.Add(ScoreGlobalCommunalIndex, "ScoreGlobalInterCommunal");

            scoreColumns.Add(AccessAuxInterfaceNumberRegionIndex, "AccessAuxInterfaceNumberRegion");
            scoreColumns.Add(AccessAuxInterfaceNumberDepartmentIndex, "AccessAuxInterfaceNumberDepartment");
            scoreColumns.Add(AccessAuxInterfaceNumberCommunalIndex, "AccessAuxInterfaceNumberCommunal");

            scoreColumns.Add(AccessInformationRegionIndex, "AccessInformationRegion");
            scoreColumns.Add(AccessInformationDepartmentIndex, "AccessInformationDepartment");
            scoreColumns.Add(AccessInformationCommunalIndex, "AccessInformationCommunal");

            scoreColumns.Add(GlobalAccessRegionIndex, "GlobalAccessRegion");
            scoreColumns.Add(GlobalAccessDepartmentIndex, "GlobalAccessDepartment");
            scoreColumns.Add(GlobalAccessCommunalIndex, "GlobalAccessCommunal");

            scoreColumns.Add(GlobalCompetencRegionIndex, "GlobalCompetenceRegion");
            scoreColumns.Add(GlobalCompetencDepartmentIndex, "GlobalCompetenceDepartment");
            scoreColumns.Add(GlobalCompetencCommunalIndex, "GlobalCompetenceCommunal");

            scoreColumns.Add(CompetenceAdministrativeRegionIndex, "CompetenceAdministrativeRegion");
            scoreColumns.Add(CompetenceAdministrativeDepartmentIndex, "CompetenceAdministrativeDepartment");
            scoreColumns.Add(CompetenceAdministrativeCommunalIndex, "CompetenceAdministrativeCommunal");

            scoreColumns.Add(CompetenceSolarisRegionIndex, "CompetenceSolarisRegion");
            scoreColumns.Add(CompetenceSolarisDepartmentIndex, "CompetenceSolarisDepartment");
            scoreColumns.Add(CompetenceSolarisCommunalIndex, "CompetenceSolarisCommunal");

            var columnNames = String.Join(", ", scoreColumns.Select(kvp => kvp.Value));
            var columnParameterNames = String.Join(", ", scoreColumns.Select(kvp => $"@{kvp.Value}"));

            var columnValues = new Dictionary<int, decimal>(21);

            var transaction = await connection.BeginTransactionAsync();
            var commandQuery = $"INSERT INTO fragility_score(NomCom, CodeIris, NomIris, LibRegion, LibDepartment, LibInterCommunality, LibCommune, DonneesInfraCommunal, PopulationScore, {columnNames}) " + 
            $"VALUES(@NomCom, @CodeIris, @NomIris, @LibRegion, @LibDepartment, @LibInterCommunality, @LibCommune, @DonneesInfraCommunal, @PopulationScore, {columnParameterNames})";

            var command = connection.CreateCommand();
            command.CommandText = commandQuery;
            command.CommandType = System.Data.CommandType.Text;

            var columnParameters = new Dictionary<int, SqliteParameter>(21);

            // var pNomCom = command.CreateParameter();
            // pNomCom.ParameterName = "NomCom";
            // pNomCom.DbType = System.Data.DbType.String;

            // var pCodeIris = command.CreateParameter();
            // pCodeIris.ParameterName = "CodeIris";
            // pCodeIris.DbType = System.Data.DbType.String;

            // var pLibRegion = command.CreateParameter();
            // pLibRegion.ParameterName = "NomIris";
            // pLibRegion.DbType = System.Data.DbType.String;

            // var pNomIris = command.CreateParameter();
            // pNomIris.ParameterName = "LibRegion";
            // pNomIris.DbType = System.Data.DbType.Int32;

            // var pLibDepartment = command.CreateParameter();
            // pLibDepartment.ParameterName = "LibDepartment";
            // pLibDepartment.DbType = System.Data.DbType.Int32;

            // var pLibInterCommunality = command.CreateParameter();
            // pLibInterCommunality.ParameterName = "LibInterCommunality";
            // pLibInterCommunality.DbType = System.Data.DbType.Int32;

            // var pLibCommune = command.CreateParameter();
            // pLibCommune.ParameterName = "LibCommune";
            // pLibCommune.DbType = System.Data.DbType.Int32;

            // var pDonneesInfraCommunal = command.CreateParameter();
            // pDonneesInfraCommunal.ParameterName = "DonneesInfraCommunal";
            // pDonneesInfraCommunal.DbType = System.Data.DbType.Int32;

            // var pPopulationScore = command.CreateParameter();
            // pPopulationScore.ParameterName = "PopulationScore";
            // pPopulationScore.DbType = System.Data.DbType.Decimal;

            // foreach (var kvp in scoreColumns)
            // {
            //     var parameter = command.CreateParameter();
            //     parameter.ParameterName = $"{kvp.Value}";
            //     parameter.DbType = System.Data.DbType.Decimal;

            //     columnParameters.Add(kvp.Key, parameter);
            // }

            var logTime = DateTime.Now;
            var count = 0;
            foreach (var line in lines.Skip(1))
            {
                var values = line.Split('\t');

                // SetValue(pNomCom, values[NomComIndex]);
                // SetValue(pCodeIris, values[CodeIrisIndex]);
                // SetValue(pNomIris, values[NomIrisIndex]);

                // pLibRegion.Value = 0;
                // pLibDepartment.Value = 0;
                // pLibInterCommunality.Value = 0;
                // pLibCommune.Value = 0;

                var donnesInfraCommune = values[DonneesInfraCommunalIndex];
                var donnesInfraCommuneValue = donnesInfraCommune != null && donnesInfraCommune == "Oui" ? 1: 0;
                // pDonneesInfraCommunal.Value = donnesInfraCommune != null && donnesInfraCommune == "Oui" ? 1: 0;
                // pPopulationScore.Value = ParseNumer(values[PopulationScoreIndex]);

                // foreach (var kvp in scoreColumns)
                // {
                //     var parameter = columnParameters[kvp.Key];
                //     parameter.Value = ParseNumer(values[kvp.Key]);
                // }
                var scoreValues = scoreColumns.Select(kvp => ParseNumer(values[kvp.Key]).ToString());
                var scoreValueQueries = String.Join(", ", scoreValues);

                var query = $"INSERT INTO fragility_score(NomCom, CodeIris, NomIris, LibRegion, LibDepartment, LibInterCommunality, LibCommune, DonneesInfraCommunal, PopulationScore, {columnNames}) " + 
                $"VALUES({StringQueryValue(values[NomComIndex])}, {StringQueryValue(values[CodeIrisIndex])}, {StringQueryValue(values[NomIrisIndex])}, 0, 0, 0, 0, {donnesInfraCommuneValue}, {ParseNumer(values[PopulationScoreIndex])}, {scoreValueQueries})";

                command.CommandText = query;
                await command.ExecuteNonQueryAsync();

                count++;

                if ((DateTime.Now - logTime).TotalSeconds >= 5)
                {
                    logTime = DateTime.Now;
                    Console.Write($"Processed: {count}");
                }
            }

            await transaction.CommitAsync();
            transaction.Dispose();
            command.Dispose();
            connection.Close();
            connection.Dispose();
        }

        static decimal ParseNumer(string text)
        {
            var value = 0m;
            if (Decimal.TryParse(text, out value))
            {
                return value;
            }
            return value;
        }

        static string StringQueryValue(string value)
        {
            if (!String.IsNullOrEmpty(value))
            {
                return $"'{value.Replace("'", "''")}'";
            }
            else
            {
                return "NULL";
            }
        }

        static void SetValue(SqliteParameter parameter, string value)
        {
            if (!String.IsNullOrEmpty(value))
            {
                parameter.Value = value;
            }
            else
            {
                parameter.Value = DBNull.Value;
            }
        }
    }
}
