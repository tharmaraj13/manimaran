import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consolidated',
  templateUrl: './consolidated.component.html',
  styleUrls: ['./consolidated.component.scss']
})
export class ConsolidatedComponent {
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
      processing: true,
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
    this.apiservice.view_consolidated().subscribe((res) => {
      this.table_data = res;
    })
  }
  onSubmit() {
    this.table_data=[];
    this.apiservice.view_consolidated_all(
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
