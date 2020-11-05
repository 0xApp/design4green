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
    }
}
