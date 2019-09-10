import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent, DialogAppComponent, AlertAppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './material-module';
import { RamcountComponent } from './components/ramcount/ramcount.component';
import { LicenseusageComponent } from './components/licenseusage/licenseusage.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    RamcountComponent,
    LicenseusageComponent,
    TableComponent,
    DialogAppComponent,
    AlertAppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [AppComponent, DialogAppComponent, AlertAppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
