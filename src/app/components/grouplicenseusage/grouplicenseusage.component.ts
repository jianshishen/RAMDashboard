import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-grouplicenseusage',
  templateUrl: './grouplicenseusage.component.html',
  styleUrls: ['./grouplicenseusage.component.css']
})
export class GrouplicenseusageComponent implements OnInit, OnChanges {

  displayData = [];

  @Input() GroupName;
  @Input() Documents;
  @Input() Date;

  generateDisplayData() {
    this.displayData = [];
    this.Documents[this.Date].filter(doc => doc['GroupName'] === this.GroupName).map(doc => {
      if (doc['LicenseUsage'] !== undefined) {
        let temp = {};
        let day = doc['ThisSampleDT'].split(' ')[0].split('/')[0];
        let month = doc['ThisSampleDT'].split(' ')[0].split('/')[1];
        let year = doc['ThisSampleDT'].split(' ')[0].split('/')[2];
        const timeObject = new Date(year + '-' + month + '-' + day + 'T' + doc['ThisSampleDT'].split(' ')[1]);
        temp['t'] = timeObject.getTime();
        temp['y'] = doc['LicenseUsage'];
        this.displayData.push(temp);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.generateDisplayData();
    this.update();
  }

  ngOnInit() {
    this.generateDisplayData();
    this.update();
  }

  update() {
    const ctx = document.getElementById('groupLicenseUsageChart');
    const cfg = {
      type: 'chart',
      data: {
        datasets: [{
          label: 'License Usage',
          data: this.displayData,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          type: 'line',
          pointRadius: 0,
          fill: false,
          lineTension: 0,
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'series',
            ticks: {
              source: 'data',
              autoSkip: true
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'License Usage'
            }
          }]
        }
        // tooltips: {
        //   intersect: false,
        //   mode: 'index',
        //   callbacks: {
        //     label: (tooltipItem, myData) => {
        //       let label = myData.datasets[tooltipItem.datasetIndex].label || '';
        //       if (label) {
        //         label += ': ';
        //       }
        //       label += parseFloat(tooltipItem.value).toFixed(2);
        //       return label;
        //     }
        //   }
        // }
      }
    };
    const chart = new Chart(ctx, cfg);
  }

}
