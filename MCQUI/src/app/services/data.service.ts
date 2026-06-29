import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionDto } from '../models/questoinDto';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: string = 'https://localhost:7001/api/MCQ';

  constructor(private http: HttpClient) { }

  getQuestionsBySkill(skill: string) : Observable<Question[]> {
        
// const params = new HttpParams().set('skill', skill);
  var result = this.http.get<Question[]>(
    `${this.baseUrl}/GetAllQuestionsBySkill/${encodeURIComponent(skill)}`
    );
    return result;
  }

  updateQuestionDetails(questionId: number, questionDto: QuestionDto ): Observable<void>{
    return this.http.put<void>(`${this.baseUrl}/${questionId}`, questionDto);
  }
}
