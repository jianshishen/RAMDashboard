import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-licenseusage',
  templateUrl: './licenseusage.component.html',
  styleUrls: ['./licenseusage.component.css']
})
export class LicenseusageComponent implements OnChanges {

  data = {
    datasets: [{
      data: [10, 20],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(211,211,211)'],
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Used',
      'Unused'
    ]
  };

  @Input() LicenseLimit;
  @Input() LicenseUsage;

  // constructor(private configService: ConfigService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.LicenseUsage !== undefined) {
      this.data.datasets[0].data[0] = (changes.LicenseUsage.currentValue === undefined ? 0 : changes.LicenseUsage.currentValue);
    }
    if (changes.LicenseLimit !== undefined) {
      this.data.datasets[0].data[1] = (
        changes.LicenseLimit.currentValue === undefined ? 0 : changes.LicenseLimit.currentValue - this.data.datasets[0].data[0]
      );
    }
    this.update();
  }

  update() {
    const ctx = document.getElementById('licenseUsageChart');
    const chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'doughnut',

      // The data for our dataset
      data: this.data,

      // Configuration options go here
      options: {
        // maintainAspectRatio: false,
        // rotation: 1 * Math.PI,
        // circumference: 1 * Math.PI
      }
    });
  }

}
