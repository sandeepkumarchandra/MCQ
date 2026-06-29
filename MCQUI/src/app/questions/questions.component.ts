import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { CommonModule } from '@angular/common';
import { QuestionDto } from '../models/questoinDto';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-questions',
  imports: [CommonModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent {
  selectedSkill = '';
  questions: Question[] = [];

  currentIndex = signal(0);
  selectedAnswerId: number | null = null;
  checked = false;
  selectedAnswerIds = new Set<number>();
  isAnswerCorrect : boolean = false;
  
  get isMulti(): boolean {
    return !!this.currentQuestion?.allowMultiple;
  }


  constructor(private route: ActivatedRoute,
              private ser: DataService,
              private cdr: ChangeDetectorRef
  ) {  }

  
// ngOnInit(): void {
//     this.route.queryParamMap.pipe(
//       map(params => params.get('selectedSkill') ?? ''),
//       filter(skill => !!skill),  // don't call API for empty skill
//       switchMap(skill => {
//         this.selectedSkill = skill;
//         return this.ser.getQuestionsBySkill(skill);
//       }),
//       takeUntilDestroyed(this.destroyRef)
//     ).subscribe({
//       next: data => this.questions = data,
//       error: err => console.error(err)
//     });
//   }


  ngOnInit() {
    this.route.queryParamMap.pipe(take(1)).subscribe(params => {
      this.selectedSkill = params.get('selectedSkill') ?? '';
      if (this.selectedSkill) {
        this.getQuestionsBySkill();
      }
    });
  }
  // arr = [];
  arr = [4, 6, 12, 15, 20, 20, 30, 35, 40, 45, 50, 57];

  interview(){
    
// const uniqueArr = [...new Set(this.arr)];
// console.log(uniqueArr)

      let uniqueArr : number[] = [];
      for(let i=0;i<this.arr.length; i++)
      {
        if(!uniqueArr.includes(this.arr[i]))
            uniqueArr.push(this.arr[i]);
      }
      console.log(uniqueArr);
    }


  getQuestionsBySkill() {
    this.ser.getQuestionsBySkill(this.selectedSkill).pipe(take(1)).subscribe({
      next: (data) => {
        this.questions = data ?? [];
        this.currentIndex.set(0);
        this.resetState();
        this.cdr.detectChanges(); // Ensure the view updates after data is set
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  
// convenience getter
  get currentQuestion(): Question | null {
    return this.questions.length
      ? this.questions[this.currentIndex()]
      : null;
  }

  
isSelected(answerId: number): boolean {
  return this.selectedAnswerIds.has(answerId);
}

selectAnswer(a: any) {
  if (this.isMulti) {
    // For safety: if allowMultiple accidentally true, use toggle
    this.selectedAnswerIds.has(a.answerId)
      ? this.selectedAnswerIds.delete(a.answerId)
      : this.selectedAnswerIds.add(a.answerId);
  } else {
    this.selectedAnswerId = a.answerId;
    // Keep Set in sync (optional)
    this.selectedAnswerIds.clear();
  }
}

toggleAnswer(a: any, event: Event) {
  if (!this.questions[this.currentIndex()].allowMultiple) return;

  const checked = (event.target as HTMLInputElement).checked;
  if (checked) this.selectedAnswerIds.add(a.answerId);
  else this.selectedAnswerIds.delete(a.answerId);
}

// checkAnswer() {
//   if(this.isMulti &&
//       this.selectedAnswerIds.size === 0) return;

//   else {
//     if (this.selectedAnswerId == null) return;
//       this.checked = true;
//   }
// }

retry() {
  this.selectedAnswerId = null;
  this.selectedAnswerIds.clear();
  this.checked = false;
}

next() {
  if (this.currentIndex() < this.questions.length - 1) {
    // this.currentIndex++;
    this.currentIndex.update(value => value + 1);
    this.resetState();
  }
}

  previous() {
    if (this.currentIndex() > 0) {
      // this.currentIndex--;
      this.currentIndex.update(value => value - 1);
      this.resetState();
    }
  }

  private resetState() {
    this.selectedAnswerId = null;
    this.selectedAnswerIds.clear();
    this.checked = false;
  }

  isCorrect(answer: Answer): boolean {
    // return this.checked && answer.isCorrect;
    if(this.isMulti)
    {
      console.info(this.selectedAnswerIds);
      return (this.checked && this.selectedAnswerIds.has(answer.answerId) && answer.isCorrect);
    }
    else
    {
      return (this.checked &&
      this.selectedAnswerId === answer.answerId && answer.isCorrect);
    }
  }

  isWrong(answer: Answer): boolean {
    if(this.isMulti)
    {
      return (this.checked && this.selectedAnswerIds.has(answer.answerId) && !answer.isCorrect);
    }
    else{
    return (
      this.checked &&
      this.selectedAnswerId === answer.answerId &&
      !answer.isCorrect
    );
  }
  }

  goToIndex(index: number) {
  const i = Number(index);
  if (i >= 0 && i < this.questions.length) {
    // this.currentIndex = i;
    this.currentIndex.set(i);
    this.resetState(); // clear selection & colors
  }
}


isSelectedAnswerCorrect(): boolean {
  this.checked = true;
const q = this.currentQuestion;
  if (!q) return false;

  if(!this.isMulti)
  {
    if (this.selectedAnswerId == null) return false;

    const selected = this.currentQuestion.answers.find(
      a => a.answerId === this.selectedAnswerId
    );
    this.isAnswerCorrect = !!selected?.isCorrect;
    this.updateAnsweredStatus(q);
    return this.isAnswerCorrect;
  }

  const correctIds = new Set(q.answers.filter(a => a.isCorrect).map(a => a.answerId));
  if (this.selectedAnswerIds.size !== correctIds.size) return false;

    for (const id of this.selectedAnswerIds) {
      if (!correctIds.has(id)) {
        this.isAnswerCorrect = false;
        this.updateAnsweredStatus(q);
        return this.isAnswerCorrect;
      }
  }
  this.isAnswerCorrect = true;
  this.updateAnsweredStatus(q);
  return true;
}

isPartialCorrect(): boolean {
const q = this.currentQuestion;
  if (!q) return false;

  // if(this.isSelectedAnswerCorrect()) return false;
  if(this.isAnswerCorrect) return false;
  const correctIds = new Set(q.answers.filter(a => a.isCorrect).map(a => a.answerId));
  // if (this.selectedAnswerIds.size !== correctIds.size) return false;

    for (const id of this.selectedAnswerIds) {
      if (correctIds.has(id)) return true;
  }
  return false;
}

updateAnsweredStatus(q: Question, ){
  let qDto : QuestionDto = {
    isAnswerCorrect: this.isAnswerCorrect
  };
  this.ser.updateQuestionDetails(q.questionId, qDto)
  .subscribe({
    next: () => console.log("Question status updated"),
    error: (err) => console.error(err)
  });
}

}
