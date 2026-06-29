import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  selectedSkill = '';
  skillOptions = ['Azure', 'C#', 'Core'];

  constructor(private router: Router) {}

  goToQuestions() {
    this.router.navigate(['/questions'], {
      queryParams: { selectedSkill: this.selectedSkill }
    });

  }

}
