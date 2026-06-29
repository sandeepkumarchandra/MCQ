using System.ComponentModel.DataAnnotations;

namespace MCQ.Models
{

    public class Question
    {
        [Key]
        public int QuestionId { get; set; }

        [Required]
        [MaxLength(2000)]
        public string QuestionText { get; set; } = null!;

        // 0 = Single correct, 1 = Multiple correct
        public bool AllowMultiple { get; set; } = false;

        [MaxLength(200)]
        public string? Category { get; set; }

        [MaxLength(200)]
        public string? SubCategory { get; set; }

        [MaxLength(50)]
        public string? Difficulty { get; set; }

        [MaxLength(4000)]
        public string? Explanation { get; set; }

        public DateTime CreatedAt { get; set; } // set by DB default (SYSUTCDATETIME)

        // Navigation: 1 Question -> many Answers
        public ICollection<Answer> Answers { get; set; } = new List<Answer>();
        public bool IsAnswerCorrect { get; set; } = false;
    }

}
