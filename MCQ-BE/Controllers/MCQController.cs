using MCQ.Interfaces.Repositories;
using MCQ.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MCQ.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MCQController : ControllerBase
    {
        IQuestionsRepository _questionsRepository;

        public MCQController(IQuestionsRepository questionsRepository)
        {
            _questionsRepository = questionsRepository;
        }

        [HttpGet("GetAllQuestionsBySkill/{skill}")]
        public async Task<ActionResult<IEnumerable<Question>>> GetAllQuestionsBySkill(string skill)
        {
            var result = await _questionsRepository.GetAllQuestionsBySkillAsync(skill);
            return Ok(result);
        }


        [HttpPut("{questionId:int}")]
        public async Task<IActionResult> UpdateQuestionDetails(int QuestionId, [FromBody] UpdateQuestionDto request)
        {
            if (request == null)
                return BadRequest("Request body is required.");

            var rows = await _questionsRepository.UpdateAnsweredStatus(QuestionId, request);

            //creates problem when IsAnswerCorrect is already true. so commented
            //if (rows == 0)
            //    return NotFound($"QuestionId {QuestionId} not found.");

            return NoContent();
        }

    }
}
