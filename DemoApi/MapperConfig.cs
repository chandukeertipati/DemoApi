using AutoMapper;
using DemoApi.BussinesLayer.Interfaces;
using DemoApi.BussinesLayer;

namespace DemoApi
{
    public class MapperConfig
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mapperConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<IExpenseCsv, ExpenseCsvService>().ReverseMap();
                config.CreateMap<ICsvUpload, CsvUploadService>().ReverseMap();
            });
            return mapperConfig;
        }

    }
}
