using MCQ.Models;

namespace MCQ.Interfaces.Repositories
{
    public interface IQuestionsRepository
    {
        public Task<IEnumerable<Question>> GetAllQuestionsAsync();
        public Task<IEnumerable<Question>> GetAllQuestionsBySkillAsync(string skill);
        public Task<int> UpdateAnsweredStatus(int QuestionId, UpdateQuestionDto request);

    }
}
