import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent {
  myForm: FormGroup | any;
  id:any;
  constructor(private apiservice: ApiserviceService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.myForm = new FormGroup(
      {
        vname: new FormControl('', Validators.required),
      }
    );
    this.apiservice.view_vendors_id(this.id).subscribe((res:any) => {
      if(res.status=='ok'){
        this.myForm.get('vname').setValue(res.vname);
      }
    })
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    // alert('Data Added Successfully');
    if (this.myForm.valid) {
      this.apiservice.add_vendor(this.myForm.get('vname').value,this.id).subscribe((res: any) => {
        if(res.status=='ok'){
          Swal.fire({
            title: 'Insurance/TPA Added Successfully',
            icon: 'success',
          })
          this.myForm.reset();
          location.href="/vendors"
        }
        else{
          Swal.fire({
            title: 'Insurance/TPA Already Exist',
            icon: 'warning',
          })
        }
      })
    }
  }
}