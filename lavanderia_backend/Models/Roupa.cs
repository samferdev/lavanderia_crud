namespace lavanderia_backend.Models
{
    public class Roupa
    {
        public int Id { get; set; }
        public string? Tipo { get; set; }
        public string? Cor { get; set; }
        public bool Lavada { get; set; } = false;

        public string? Status { get; set; }
    }
}
