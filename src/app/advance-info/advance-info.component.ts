import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-advance-info',
  templateUrl: './advance-info.component.html',
  styleUrls: ['./advance-info.component.scss']
})
export class AdvanceInfoComponent {
  constructor(private apiservice: ApiserviceService, private router: Router, private route: ActivatedRoute) { }
  myForm: FormGroup | any;
  prod_names: any;
  id: any;

  ngOnInit(): void {
    this.apiservice.view_names().subscribe((res) => {
      this.prod_names = res;
    });
    this.id = this.route.snapshot.params['id'];
    this.myForm = new FormGroup(
      {
        load_date: new FormControl('', Validators.required),
        lorry_no: new FormControl('', Validators.required),
        adv_amount: new FormControl('', Validators.required),
        pay_mode: new FormControl('', Validators.required),
      }
    );
    // this.apiservice.view_sales_id(this.id).subscribe((res: any) => {
    //   if (res.status == 'ok') {
    //     this.myForm.get('load_date').setValue(res.load_date);
    //     this.myForm.get('lorry_no').setValue(res.lorry_no);
    //     this.myForm.get('adv_amount').setValue(res.adv_amount);
    //     this.myForm.get('pay_mode').setValue(res.pay_mode);
    //   }
    // })
  }
  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      var data = Array();
      data.push(this.myForm.get('load_date').value);
      data.push(this.myForm.get('lorry_no').value);
      data.push(this.myForm.get('adv_amount').value);
      data.push(this.myForm.get('pay_mode').value);
      // this.apiservice.add_products(data).subscribe((res: any) => {
      //   Swal.fire({
      //     title: 'Advance Added Successfully',
      //     icon: 'success',
      //   });
      //   this.router.navigate(['consolidated'])
      // });
    }
  }
}
