import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-groupsystemuptime',
  templateUrl: './groupsystemuptime.component.html',
  styleUrls: ['./groupsystemuptime.component.css']
})
export class GroupsystemuptimeComponent implements OnInit, OnChanges {

  displayData = [];

  @Input() GroupName;
  @Input() Documents;
  @Input() Date;

  generateDisplayData() {
    this.displayData = [];
    this.Documents[this.Date].filter(doc => doc['GroupName'] === this.GroupName).map(doc => {
      if (doc['SystemUpTime'] !== undefined) {
        let temp = {};
        let day = doc['ThisSampleDT'].split(' ')[0].split('/')[0];
        let month = doc['ThisSampleDT'].split(' ')[0].split('/')[1];
        let year = doc['ThisSampleDT'].split(' ')[0].split('/')[2];
        const timeObject = new Date(year + '-' + month + '-' + day + 'T' + doc['ThisSampleDT'].split(' ')[1]);
        temp['t'] = timeObject.getTime();
        temp['y'] = (parseInt(doc['SystemUpTime'].split('d')[0], 10) * 24) +
          (parseInt(doc['SystemUpTime'].split(' ')[2].slice(0, doc['SystemUpTime'].split(' ')[2].length - 1), 10)) +
          (parseInt(doc['SystemUpTime'].split(' ')[3].slice(0, doc['SystemUpTime'].split(' ')[3].length - 1), 10) / 60);
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
    const ctx = document.getElementById('groupSystemUptimeChart');
    const cfg = {
      type: 'chart',
      data: {
        datasets: [{
          label: 'Uptime(h)',
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
              labelString: 'Uptime(h)'
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
