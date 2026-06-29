
export interface Answer {
  answerId: number;        // [Key]
  questionId: number;      // [Required] (FK)

  answerText: string;      // [Required], [MaxLength(2000)]
  choiceLabel?: string | null; // "A", "B" etc. [MaxLength(10)]

  displayOrder: number;    // default = 1
  isCorrect: boolean;      // default = false

}