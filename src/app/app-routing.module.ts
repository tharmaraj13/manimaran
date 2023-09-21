import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './add-products/add-products.component';
import { LoginComponent } from './login/login.component';
import { SalesReportComponent } from './sales-report/sales-report.component';

import { TestingComponent } from './testing/testing.component';
import { AddInsuranceComponent } from './add-insurance/add-insurance.component';
import { AddHospitalComponent } from './add-hospital/add-hospital.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { ViewHospitalComponent } from './view-hospital/view-hospital.component';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';
import { ViewInsuranceComponent } from './view-insurance/view-insurance.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CompanyComponent } from './company/company.component';
import { PaymentPendingComponent } from './payment-pending/payment-pending.component';
import { ConsolidatedComponent } from './consolidated/consolidated.component';
import { AddOfficeComponent } from './add-office/add-office.component';
import { ViewOfficeComponent } from './view-office/view-office.component';
import { ViewLocationComponent } from './view-location/view-location.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { AdvanceInfoComponent } from './advance-info/advance-info.component';
import { ViewAdvanceComponent } from './view-advance/view-advance.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'add-intimation/:id',component:AddProductsComponent},
  {path:'add-intimation',component:AddProductsComponent},
  {path:'advance-pending',component:SalesReportComponent,title:'Advance Pending Reports'},
  {path:'payment-pending',component:PaymentPendingComponent,title:'Payment Pending Reports'},
  {path:'consolidated',component:ConsolidatedComponent,title:'Consolidated Reports'},
  {path:'view/:id',component:TestingComponent},
  {path:'invoice/:id',component:InvoiceComponent},
  {path:'add-insurance',component:AddInsuranceComponent},
  {path:'add-insurance/:id',component:AddInsuranceComponent},
  {path:'add-hospital',component:AddHospitalComponent},
  {path:'add-hospital/:id',component:AddHospitalComponent},
  {path:'add-office',component:AddOfficeComponent},
  {path:'add-office/:id',component:AddOfficeComponent},
  {path:'offices',component:ViewOfficeComponent,title:'Offices List'},
  {path:'add-city',component:AddLocationComponent},
  {path:'add-city/:id',component:AddLocationComponent},
  {path:'cities',component:ViewLocationComponent,title:'Cities List'},
  {path:'add-advance',component:AdvanceInfoComponent},
  {path:'add-advance/:id',component:AdvanceInfoComponent},
  {path:'advances',component:ViewAdvanceComponent,title:'Advances List'},
  {path:'add-vendor',component:AddVendorComponent},
  {path:'add-vendor/:id',component:AddVendorComponent},
  {path:'company',component:CompanyComponent},
  {path:'hospitals',component:ViewHospitalComponent},
  {path:'vendors',component:ViewVendorComponent},
  {path:'insurance',component:ViewInsuranceComponent},
  {path:'**',component:SalesReportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
