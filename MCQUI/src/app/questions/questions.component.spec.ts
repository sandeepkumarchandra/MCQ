import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuestionsComponent } from './questions.component';
import { Question } from '../models/Question';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;

  const activatedRouteMock = {
    queryParamMap: of({
      get: (key: string) => key === 'selectedSkill' ? 'Azure' : null
    })
  };


  const mockQuestions: Question[] = [
    {
      questionId: 1,
      questionText: 'What is Azure?',
      allowMultiple: false,
      createdAt: '2026-03-05T00:00:00Z',
      answers: [
        { answerId: 11, questionId: 1, answerText: 'Cloud platform', choiceLabel: 'A', displayOrder: 1, isCorrect: true },
        { answerId: 12, questionId: 1, answerText: 'Database only', choiceLabel: 'B', displayOrder: 2, isCorrect: false },
      ],
    },
    {
      questionId: 2,
      questionText: 'Angular is?',
      allowMultiple: false,
      createdAt: '2026-03-05T00:00:00Z',
      answers: [
        { answerId: 21, questionId: 2, answerText: 'Framework', choiceLabel: 'A', displayOrder: 1, isCorrect: true },
        { answerId: 22, questionId: 2, answerText: 'OS', choiceLabel: 'B', displayOrder: 2, isCorrect: false },
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        // ✅ Provide HttpClient + mock backend for any service that injects HttpClient
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;

    component.questions = mockQuestions;
    component.currentIndex = 0;

    fixture.detectChanges();
  });

  it('should render first question', () => {
    const title = fixture.debugElement.query(By.css('.question-text')).nativeElement as HTMLElement;
    expect(title.textContent).toContain('What is Azure?');
  });

  it('should select an answer on click', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.answer'));
    buttons[0].triggerEventHandler('click'); // click A
    fixture.detectChanges();

    expect(component.selectedAnswerId).toBe(11);
    expect(buttons[0].nativeElement.classList).toContain('selected');
  });

  it('should mark selected answer green if correct after check', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.answer'));
    buttons[0].triggerEventHandler('click'); // select correct
    fixture.detectChanges();

    component.checkAnswer();
    fixture.detectChanges();

    expect(buttons[0].nativeElement.classList).toContain('correct');
    expect(buttons[1].nativeElement.classList).not.toContain('correct'); // only selected should change
  });

  it('should mark selected answer red if wrong after check', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.answer'));
    buttons[1].triggerEventHandler('click'); // select wrong
    fixture.detectChanges();

    component.checkAnswer();
    fixture.detectChanges();

    expect(buttons[1].nativeElement.classList).toContain('wrong');
    expect(buttons[0].nativeElement.classList).not.toContain('correct'); // do not highlight correct automatically
  });

  it('retry should clear selection and checked state', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.answer'));
    buttons[0].triggerEventHandler('click');
    component.checkAnswer();
    fixture.detectChanges();

    component.retry();
    fixture.detectChanges();

    expect(component.selectedAnswerId).toBeNull();
    expect(component.checked).toBeFalse();
    expect(buttons[0].nativeElement.classList).not.toContain('correct');
    expect(buttons[0].nativeElement.classList).not.toContain('wrong');
  });

  it('next should move to next question and reset state', () => {
    component.selectedAnswerId = 11;
    component.checked = true;

    component.next();
    fixture.detectChanges();

    expect(component.currentIndex).toBe(1);
    expect(component.selectedAnswerId).toBeNull();
    expect(component.checked).toBeFalse();

    const title = fixture.debugElement.query(By.css('.question-text')).nativeElement as HTMLElement;
    expect(title.textContent).toContain('Angular is?');
  });
});