import { Answer } from './answer';

export interface Question {
  questionId: number;          // [Key]
  questionText: string;        // [Required], [MaxLength(2000)]
  allowMultiple: boolean;      // 0/1 in DB, boolean in API/TS
  category?: string | null;    // [MaxLength(200)]
  subCategory?: string | null; // [MaxLength(200)]
  difficulty?: string | null;  // [MaxLength(50)]
  explanation?: string | null; // [MaxLength(4000)]
  createdAt: string;           // DateTime from API (usually ISO string)
  answers: Answer[];           // ICollection<Answer> -> Answer[]
  IsAnswerCorrect: boolean;
}