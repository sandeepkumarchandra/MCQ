import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { QuestionsComponent } from './questions.component';
import { Question } from '../models/question';

describe('QuestionsComponent initial load', () => {
  let fixture: ComponentFixture<QuestionsComponent>;
  let component: QuestionsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({
              get: (key: string) => (key === 'selectedSkill' ? 'Azure' : null),
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
  });

  it('shows the first question when questions are available on first render', () => {
    const questions: Question[] = [
      {
        questionId: 1,
        questionText: 'What is Azure?',
        allowMultiple: false,
        createdAt: '2026-03-05T00:00:00Z',
        answers: [
          {
            answerId: 11,
            questionId: 1,
            answerText: 'Cloud platform',
            choiceLabel: 'A',
            displayOrder: 1,
            isCorrect: true,
          },
        ],
        IsAnswerCorrect: false,
      },
    ];

    component.questions = questions;
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.question-text'));
    expect(title).not.toBeNull();
    expect(title.nativeElement.textContent).toContain('What is Azure?');
  });
});
