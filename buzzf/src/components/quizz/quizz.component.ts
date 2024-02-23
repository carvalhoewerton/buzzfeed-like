import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import quizz_questions from '../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {
  title: string = '';
  questions: any;
  questionSelected: any;
  answers: string[] = [];
  answerSelected: string = "";
  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  finished: boolean = false;

  press(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  constructor() {}

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title; //pegando título da questão

      this.questions = quizz_questions.questions; // pegando o array de questoes da api e falando q o array de questoes é o mesmo do da api
      this.questionSelected = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length; // Corrigido o erro aqui
    }
  }

  async nextStep() {
    this.questionIndex++;
    if (this.questionIndex < this.questionMaxIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const final:string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = quizz_questions.results[final as keyof typeof quizz_questions.results]
    }

  }
  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, index, arr) => {
      if (arr.filter(item => item === previous).length > (arr.filter(item => item === current).length)) {
        return previous;
      } else {
        return current;
      }
    }); return result;
  }

}
