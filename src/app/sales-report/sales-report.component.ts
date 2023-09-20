import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent{
  dtOptions: any;
  myForm: FormGroup | any;
  prod_names: any;
  insurance: any;
  vendor_names: any;
  table_data: any;
  constructor(private apiservice: ApiserviceService) { }
  ngAfterViewInit(): void {
    this.apiservice.view_names().subscribe((res) => {
      this.prod_names = res;
    })
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: false,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };
    let currentDate = new Date().toJSON().slice(0, 10);
    this.myForm = new FormGroup(
      {
        fromdate: new FormControl(currentDate),
        todate: new FormControl(currentDate),
      }
    );
    this.apiservice.view_sales().subscribe((res) => {
      this.table_data = res;
    });
  }
  onSubmit() {
    this.table_data=[];
    this.apiservice.view_sales_all(
      this.myForm.get('fromdate').value,
      this.myForm.get('todate').value
    ).subscribe((res) => {
      this.table_data = res;
    })
  }
  remove(id:any) {
    var result = confirm("Are You sure?");
    if (result) {
      this.apiservice.del_intimation(id).subscribe((res) => {
        location.reload();
      })
    }
  }
}
