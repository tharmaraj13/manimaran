import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-add-insurance',
  templateUrl: './add-insurance.component.html',
  styleUrls: ['./add-insurance.component.scss']
})
export class AddInsuranceComponent {
  myForm: FormGroup | any;
  id: any;
  constructor(private apiservice: ApiserviceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.myForm = new FormGroup(
      {
        iname: new FormControl('', Validators.required),
        address1: new FormControl('', Validators.required),
        address2: new FormControl('', Validators.required),
        gstin: new FormControl('', Validators.required),
      }
    );
    this.apiservice.view_insurance_id(this.id).subscribe((res: any) => {
      if (res.status == 'ok') {
        this.myForm.get('iname').setValue(res.iname);
        this.myForm.get('address1').setValue(res.address1);
        this.myForm.get('address2').setValue(res.address2);
        this.myForm.get('gstin').setValue(res.gstin);
      }
    })
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    // alert('Data Added Successfully');
    if (this.myForm.valid) {
      this.apiservice.add_insurance(
        this.myForm.get('iname').value,
        this.id,
        this.myForm.get('address1').value,
        this.myForm.get('address2').value,
        this.myForm.get('gstin').value
      ).subscribe((res: any) => {
        if (res.status == 'ok') {
          // Swal.fire({
          //   title: 'Insurance/TPA Added Successfully',
          //   icon: 'success',
          // })
          // this.myForm.reset();
          location.href = "/insurance"
          // this.router.navigate(['insurance']);
        }
        else {
          Swal.fire({
            title: 'Insurance/TPA Already Exist',
            icon: 'warning',
          })
        }
      })
    }
  }
}