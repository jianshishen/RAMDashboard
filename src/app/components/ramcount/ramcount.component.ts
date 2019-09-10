import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-ramcount',
  templateUrl: './ramcount.component.html',
  styleUrls: ['./ramcount.component.css']
})
export class RamcountComponent implements OnChanges {

  @Input() RAMCount;

  // constructor(private configService: ConfigService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.RAMCount.currentValue !== undefined) {
      this.update(JSON.parse(changes.RAMCount.currentValue)['GlobalBuffers'].split(',').map((item) => {
        return parseInt(item, 10);
      }));
    }
  }

  update(newValue) {
    const ctx = document.getElementById('ramCountChart');
    const chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
        labels: ['2K', '4K', '8K', '16K', '32K', '64K'],
        datasets: [{
          label: 'GlobalBuffers',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: newValue
        }]
      },

      // Configuration options go here
      options: { maintainAspectRatio: false }
    });
  }

}
