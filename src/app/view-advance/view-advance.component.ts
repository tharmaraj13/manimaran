import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-view-advance',
  templateUrl: './view-advance.component.html',
  styleUrls: ['./view-advance.component.scss']
})
export class ViewAdvanceComponent {
  constructor(private apiservice: ApiserviceService, private router: Router, private route: ActivatedRoute) { }
  myForm: FormGroup | any;
  prod_names: any;
  dtOptions: any;
  table_data: any;
  sub_total:any=0.00;

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 30,
      processing: false,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };
    let currentDate = new Date().toJSON().slice(0, 10);
    this.myForm = new FormGroup(
      {
        lorry_no: new FormControl(''),
        fromdate: new FormControl(currentDate),
        todate: new FormControl(currentDate),
      }
    );
    this.apiservice.view_advance().subscribe((res) => {
      this.table_data = res;
      this.sub_total = this.table_data.reduce((a: any, b: any) => {
        return +a + +b.adv_amount;
      }, 0);
      this.sub_total=this.sub_total.toFixed(2);
    });
    this.apiservice.view_names().subscribe((res) => {
      this.prod_names = res;
    });
  }
  onSubmit() {
    this.table_data=[];
    this.apiservice.view_advance_all(
      this.myForm.get('lorry_no').value,
      this.myForm.get('fromdate').value,
      this.myForm.get('todate').value
    ).subscribe((res) => {
      this.table_data = res;
      this.sub_total = this.table_data.reduce((a: any, b: any) => {
        return +a + +b.adv_amount;
      }, 0);
      this.sub_total=this.sub_total.toFixed(2);
    })
  }
  remove(id:any) {
    var result = confirm("Are You sure?");
    if (result) {
      this.apiservice.del_advance(id).subscribe((res) => {
        location.reload();
      })
    }
  }
}
