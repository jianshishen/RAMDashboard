import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import config from '../assets/config.json';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

const CONTENT = 'content';
const GROUPNAME = 'GroupName';
const THISSAMPLEDT = 'ThisSampleDT';
const ATTRIBUTELIST: string[] = [
  'zsys.RAM.Attribute.ISCversion', 'zsys.RAM.Attribute.ISCInstanceName', 'zsys.RAM.Attribute.CPUCount',
  'zsys.RAM.Attribute.HostName', 'zsys.RAM.Attribute.IPAddress', 'zsys.RAM.Attribute.LicenseLimit',
  'zsys.RAM.Attribute.LicenseMaxHit', 'zsys.RAM.Attribute.LicenseTo', 'zsys.RAM.Attribute.LicenseUsage',
  'zsys.RAM.Attribute.RAMCount', 'zsys.RAM.Attribute.SystemUpTime', 'zsys.RAM.Attribute.SensitiveData'
];

export interface AlertData {
  alertKey: number;
  alert;
}

@Component({
  selector: 'app-alert',
  templateUrl: './app.component.alert.html',
})

export class AlertAppComponent {
  constructor(
    public alertRef: MatDialogRef<AlertAppComponent>,
    @Inject(MAT_DIALOG_DATA) public alertData: AlertData) { }

  onNoClick(): void {
    this.alertRef.close();
  }
}

export interface DialogData {
  serverList: string[];
  groupList: string[];
}

@Component({
  selector: 'app-dialog',
  templateUrl: './app.component.dialog.html'
})

export class DialogAppComponent {

  dialogAttributeFC = new FormControl();
  dialogNewGroupFC = new FormControl();
  dialogPutGroupFC = new FormControl();
  dialogRemoveGroupFC = new FormControl();

  attributes = ATTRIBUTELIST;

  newGroupName: string;
  newGroupDescription: string;
  attributesSelected: string[];
  newGroupServerSelected: string;
  putGroupServerSelected: string;
  putGroupGroupSelected: string;
  removeGroupServerSelected: string;
  removeGroupGroupSelected: string;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogAppComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData) { }

  createGroup() {
    if (this.newGroupName === undefined) {
      alert('GroupName must not be empty');
      return;
    }

    this.http.post(config.Server + config.Port + config.GroupModificationPrefix,
      { GroupName: this.newGroupName, Description: this.newGroupDescription, SystemId: this.newGroupServerSelected },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ).toPromise();
    this.snackBar.open('Done', 'GOT IT', {
      duration: 5000,
    });
  }

  putServerIntoGroup() {
    this.http.put(config.Server + config.Port + config.GroupModificationPrefix + '/' +
      this.putGroupGroupSelected + '/' + this.putGroupServerSelected, {}).toPromise();
    this.snackBar.open('Done', 'GOT IT', {
      duration: 5000,
    });
  }

  removeServerFromGroup() {
    this.http.delete(
      config.Server + config.Port + config.GroupModificationPrefix + '/' +
      this.removeGroupGroupSelected + '/' + this.removeGroupServerSelected, {}
    ).toPromise();
    this.snackBar.open('Done', 'GOT IT', {
      duration: 5000,
    });
  }

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  data = { SystemId: '', CurrentDate: '', CurrentDocument: {}, Dates: [], Documents: {} };
  title = 'RAMDashboard';

  alerts = {};
  alertsNum: number;
  dateSelected: string;
  serverList: string[];
  groupList: string[];

  constructor(private http: HttpClient, public dialog: MatDialog, public alert: MatDialog, private snackBar: MatSnackBar) { }

  change(nav: string): void {
    this.data.SystemId = nav;
    this.requestDocuments(this.data.SystemId);
  }

  openAlert(key: number): void {

    const alertRef = this.alert.open(AlertAppComponent,
      {
        data: { alertKey: key, alert: this.alerts[key] }
      });

    alertRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.http.delete(
          config.Server + config.Port + config.DeleteAlertPrefix + result, {}
        ).toPromise().then(() => {
          this.snackBar.open('Done', 'GOT IT', {
            duration: 5000,
          });
          this.requestAlerts();
        });
      }
    });

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAppComponent, {
      width: '700px',
      data: {
        serverList: this.serverList,
        groupList: this.groupList.filter((group) => group[GROUPNAME] !== 'UndeterminedGroup')
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) { return; }

      if (result === 0) {
        this.requestChangingAttributes(result, true);
      } else {
        this.requestChangingAttributes(result, false);
      }
      this.snackBar.open('Done', 'GOT IT', {
        duration: 5000,
      });

    });
  }

  requestAlerts() {
    this.alerts = {};
    return this.http.post(
      config.Server + config.Port + config.AlertData, {}
    ).toPromise().then(res => {
      this.alertsNum = res[CONTENT][CONTENT].length;
      res[CONTENT][CONTENT].reduce((_, alert) => { this.alerts[alert['%DocumentId']] = JSON.parse(alert['%Doc']); }, 0);
    });
  }

  requestChangingAttributes(result: string[], def: boolean) {
    if (def) {
      this.http.get(config.Server + config.Port + config.PutAttributesPrefix + this.data.SystemId, {}).toPromise();
    } else {
      this.http.put(config.Server + config.Port + config.PutAttributesPrefix + this.data.SystemId + '/' + result.join(), {}).toPromise();
    }
  }

  requestDocuments(SystemId: string) {
    return this.http.post(
      config.Server + config.Port + config.ServerStatusData, { restriction: ['SystemId', SystemId, '='] }
    ).toPromise().then(res => {
      res[CONTENT][CONTENT].reduce((_, doc) => {
        this.data.Documents[JSON.parse(doc['%Doc'])[THISSAMPLEDT].split(' ')[0]] =
          this.data.Documents[JSON.parse(doc['%Doc'])[THISSAMPLEDT].split(' ')[0]] || [];
        this.data.Documents[JSON.parse(doc['%Doc'])[THISSAMPLEDT].split(' ')[0]].push(JSON.parse(doc['%Doc']));
      }, 0);

      Object.keys(this.data.Documents).map((date) => { this.data.Dates.push(date); });

      this.data.CurrentDocument = this.data.CurrentDate === '' ? JSON.parse(
        res[CONTENT][CONTENT][res[CONTENT][CONTENT].length - 1]['%Doc']) : this.data.Documents[this.data.CurrentDate][-1];
      this.data.CurrentDate = this.data.CurrentDate === '' && JSON.parse(
        res[CONTENT][CONTENT][res[CONTENT][CONTENT].length - 1]['%Doc'])[THISSAMPLEDT].split(' ')[0];
    });
  }

  requestServerList() {
    return this.http.get(
      config.Server + config.Port + config.ServerList
    ).toPromise().then((res: string[]) => {
      this.serverList = res;
      this.data.SystemId = res.length === 0 ? '' : res[0];
    });
  }

  requestGroupList() {
    this.http.get(
      config.Server + config.Port + config.GroupServerList
    ).toPromise().then((res: string[]) => {
      this.groupList = res;
    });
  }

  updateDate(date: string) {
    this.data.CurrentDate = date;
    this.ngOnInit();
  }

  async ngOnInit() {
    await this.requestServerList();
    this.requestGroupList();
    await this.requestDocuments(this.data.SystemId);
    await this.requestAlerts();
    // setInterval(() => { this.serverList.push('a'); }, 1000);
  }
}
