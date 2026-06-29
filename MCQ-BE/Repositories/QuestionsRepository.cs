using MCQ.Data;
using MCQ.Interfaces.Repositories;
using MCQ.Models;
using Microsoft.EntityFrameworkCore;

namespace MCQ.Repositories
{
    public class QuestionsRepository : IQuestionsRepository
    {
        private McqContext _context;
        public QuestionsRepository(McqContext mcqContext)
        {
            _context = mcqContext;
        }
        public async Task<IEnumerable<Question>> GetAllQuestionsAsync()
        {
            //List<Question> questions = new List<Question>();
            return _context.question.ToList();
        }

        public async Task<IEnumerable<Question>> GetAllQuestionsBySkillAsync(string skill)
        {
            //List<Question> questions = new List<Question>();
            return await _context.question
                    .Where(x => x.Category == skill)
                    .Include(q => q.Answers.OrderBy(a => a.DisplayOrder))
                    //.Take(1)
                    .ToListAsync();
        }

        public async Task<int> UpdateAnsweredStatus(int QuestionId, UpdateQuestionDto request)
        {
            var question = await _context.question.FirstOrDefaultAsync(q => q.QuestionId == QuestionId);

            if(question == null)
                throw new KeyNotFoundException($"QuestionId {QuestionId} not found.");

            question.IsAnswerCorrect = request.IsAnswerCorrect;

            return await _context.SaveChangesAsync();
        }
    }
}