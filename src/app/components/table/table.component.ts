import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnChanges {

  displayedColumns = ['name'];
  dataSource: AttributesElement[] = [];

  @Input() Attributes;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.Attributes.currentValue !== undefined) {
      const temp = [];

      JSON.parse(changes.Attributes.currentValue).map(value => temp.push({ name: value }));

      this.dataSource = temp;
    }
  }
}

export interface AttributesElement {
  name: string;
}

