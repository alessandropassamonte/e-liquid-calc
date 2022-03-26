import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LiquisResult} from './models/LiquidResult';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eliquid-calculator';

  frmCalculator: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  result: boolean;
  liquisResult: LiquisResult;

  ngOnInit(): void {
    this.result = false;
    this.frmCalculator = this.fb.group({
      totale: '',
      nicotina: '',
      dosaggioNicotina: 1,
      aroma: '',
      dosaggio: '',
      gradazione: ''
    });
  }

  calcola(value) {
    console.log(value)
    this.liquisResult = new LiquisResult();
    this.result = true;
    this.liquisResult.dosaggio = value.dosaggio;
    if (value.nicotina > 0) {
      this.liquisResult.nicotina = value.totale * value.gradazione / value.nicotina;
      switch (value.dosaggioNicotina) {
        case '1':
          // 50/50
          this.liquisResult.glicole = this.liquisResult.glicole - (this.liquisResult.nicotina / 2);
          this.liquisResult.glicerina = this.liquisResult.glicerina - (this.liquisResult.nicotina / 2);
          break;
        case '2':
          // FULL 70/30
          this.liquisResult.glicole = this.liquisResult.glicole - ((30 * 0.01) * this.liquisResult.nicotina);
          this.liquisResult.glicerina = this.liquisResult.glicerina - ((70 * 0.01) * this.liquisResult.nicotina);
          break;
        case '3':
          // FULL PG
          this.liquisResult.glicole = this.liquisResult.glicole - this.liquisResult.nicotina;
          break;
        case '4':
          // FULL VG
          this.liquisResult.glicerina = this.liquisResult.glicerina - this.liquisResult.nicotina;
          break;
      }
      this.liquisResult.totaleNoAroma = value.totale - this.liquisResult.nicotina;
    } else {
      this.liquisResult.nicotina = 0;
      this.liquisResult.totaleNoAroma = value.totale;
    }

    if (value.aroma > 0) {
      this.liquisResult.aroma = ((value.aroma * 0.01) * value.totale);
    } else {
      this.liquisResult.aroma = 0;
    }
    this.liquisResult.totaleNoAroma = value.totale;
    this.liquisResult.totaleNoAroma = this.liquisResult.totaleNoAroma - this.liquisResult.aroma;
    this.liquisResult.totaleNoAroma = this.liquisResult.totaleNoAroma - this.liquisResult.nicotina;
    console.log(this.liquisResult);
    if (value.dosaggio == '50/50') {
      this.liquisResult.glicerina = this.liquisResult.glicerina +  ((50 * 0.01) * this.liquisResult.totaleNoAroma);
      this.liquisResult.glicole = this.liquisResult.glicole +  ((50 * 0.01) * this.liquisResult.totaleNoAroma);
    } else if (value.dosaggio == '70/30') {
      this.liquisResult.glicerina = this.liquisResult.glicerina + ((70 * 0.01) * this.liquisResult.totaleNoAroma);
      this.liquisResult.glicole =  this.liquisResult.glicole + ((30 * 0.01) * this.liquisResult.totaleNoAroma);
    }
    this.liquisResult.glicole.toFixed(0);
    this.liquisResult.glicerina.toFixed(0);
    // this.frmCalculator.reset();
  }

  onChanges(): void {
    this.frmCalculator.valueChanges.subscribe(val => {
      this.result = false;
    });
  }
}
