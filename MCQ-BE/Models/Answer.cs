using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MCQ.Models
{

    public class Answer
    {
        [Key]
        public int AnswerId { get; set; }

        [Required]
        public int QuestionId { get; set; }

        [Required]
        [MaxLength(2000)]
        public string AnswerText { get; set; } = null!;

        [MaxLength(10)]
        public string? ChoiceLabel { get; set; }   // e.g., "A", "B"

        public int DisplayOrder { get; set; } = 1;

        public bool IsCorrect { get; set; } = false;

        // Navigation: many Answers -> one Question
        //[JsonIgnore]
        //[ForeignKey(nameof(QuestionId))]
        //public Question Question { get; set; } = null!;
    }

}
