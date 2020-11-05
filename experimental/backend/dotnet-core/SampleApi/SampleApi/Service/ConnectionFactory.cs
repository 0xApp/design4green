using Microsoft.Data.Sqlite;
using System.Threading.Tasks;

namespace SampleApi.Service
{
    public class ConnectionFactory
    {
        public async Task<SqliteConnection> GetConnection()
        {
            var builder = new SqliteConnectionStringBuilder();
            builder.DataSource = @"R:\data.db";

            var connection = new SqliteConnection(builder.ConnectionString);
            await connection.OpenAsync();

            return connection;
        }
    }
}
