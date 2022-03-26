import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  frmCalculator: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  result: boolean;
  nicotinaResult: number;
  aromaResult: number;
  glicerinaResult: number;
  glicoleResult: number;

  ngOnInit(): void {
    this.result = false;
    this.frmCalculator = this.fb.group({
      totale: '',
      nicotina: '',
      aroma: '',
      dosaggio: '',
      gradazione: ''
    });
  }

  calcola(value) {
    this.result = true;
    console.log('ok', value);
    this.nicotinaResult = value.totale * value.gradazione / value.nicotina;
  }

}
