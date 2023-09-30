import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AddProductsComponent } from './add-products/add-products.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SalesReportComponent } from './sales-report/sales-report.component';

import { TestingComponent } from './testing/testing.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { AddInsuranceComponent } from './add-insurance/add-insurance.component';
import { AddHospitalComponent } from './add-hospital/add-hospital.component';
import { ViewHospitalComponent } from './view-hospital/view-hospital.component';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';
import { ViewInsuranceComponent } from './view-insurance/view-insurance.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CompanyComponent } from './company/company.component';
import { PaymentPendingComponent } from './payment-pending/payment-pending.component';
import { ConsolidatedComponent } from './consolidated/consolidated.component';
import { DataTablesModule } from 'angular-datatables';
import { AddOfficeComponent } from './add-office/add-office.component';
import { ViewOfficeComponent } from './view-office/view-office.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { ViewLocationComponent } from './view-location/view-location.component';
import { AdvanceInfoComponent } from './advance-info/advance-info.component';
import { ViewAdvanceComponent } from './view-advance/view-advance.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ViewMaintenanceComponent } from './view-maintenance/view-maintenance.component';
import { ViewServicesComponent } from './view-services/view-services.component';
import { AddServicesComponent } from './add-services/add-services.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddProductsComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SalesReportComponent,
    TestingComponent,
    AddVendorComponent,
    AddInsuranceComponent,
    AddHospitalComponent,
    ViewHospitalComponent,
    ViewVendorComponent,
    ViewInsuranceComponent,
    InvoiceComponent,
    CompanyComponent,
    PaymentPendingComponent,
    ConsolidatedComponent,
    AddOfficeComponent,
    ViewOfficeComponent,
    AddLocationComponent,
    ViewLocationComponent,
    AdvanceInfoComponent,
    ViewAdvanceComponent,
    MaintenanceComponent,
    ViewMaintenanceComponent,
    ViewServicesComponent,
    AddServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
