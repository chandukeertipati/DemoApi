namespace DemoApi.BussinesLayer.Interfaces
{
    public interface IExpenseCsv
    {
        public IEnumerable<T> ReadCSV<T>(Stream file);


    }
}
