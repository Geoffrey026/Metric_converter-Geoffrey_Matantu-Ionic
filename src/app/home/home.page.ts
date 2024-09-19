import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  metrics: ('Panjang' | 'Berat' | 'Suhu')[] = ['Panjang', 'Berat', 'Suhu'];
  
  selectedMetric: 'Panjang' | 'Berat' | 'Suhu' | null = null;
  fromUnits: string[] = [];
  toUnits: string[] = [];
  fromUnit: string | null = null;
  toUnit: string | null = null;
  inputValue: number | null = null;
  result: number | null = null;

  unitOptions: { [key in 'Panjang' | 'Berat' | 'Suhu']: string[] } = {
    Panjang: ['Meter', 'Kilometer', 'Centimeter'],
    Berat: ['Gram', 'Kilogram', 'Miligram'],
    Suhu: ['Celsius', 'Fahrenheit']
  };

  conversions = {
    Panjang: { Meter: 1, Kilometer: 1000, Centimeter: 0.01 },
    Berat: { Gram: 1, Kilogram: 1000, Miligram: 0.001 },
    Suhu: { Celsius: 1, Fahrenheit: 33.8 } // Example conversion factor
  };

  updateUnits() {
    if (this.selectedMetric) {
      this.fromUnits = this.unitOptions[this.selectedMetric];
      this.toUnits = [...this.fromUnits];
    }
  }

  convert() {
    if (this.selectedMetric === 'Suhu') {
      this.convertTemperature();
    } else if (this.fromUnit && this.toUnit) {
      this.performConversion();
    }
  }

  performConversion() {
    const inputVal = this.inputValue ?? 0;
    const conversionTable = this.conversions[this.selectedMetric!];
    const fromConversion = conversionTable[this.fromUnit! as keyof typeof conversionTable];
    const toConversion = conversionTable[this.toUnit! as keyof typeof conversionTable];

    this.result = (inputVal * fromConversion) / toConversion;
  }

  convertTemperature() {
    if (!this.fromUnit || !this.toUnit || this.inputValue === null) {
      this.result = null;
      return;
    }

    const inputVal = this.inputValue;
    if (this.fromUnit === 'Celsius' && this.toUnit === 'Fahrenheit') {
      this.result = (inputVal * 9 / 5) + 32;
    } else if (this.fromUnit === 'Fahrenheit' && this.toUnit === 'Celsius') {
      this.result = (inputVal - 32) * 5 / 9;
    } else {
      this.result = inputVal; // If no conversion is needed
    }
  }
}
