namespace lavanderia_backend.Models
{
    public class Roupa
    {
        public int Id { get; set; }
        public string Cliente { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public string Status { get; set; } = "Pendente";
    }
}