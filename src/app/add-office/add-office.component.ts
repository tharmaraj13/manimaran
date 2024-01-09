import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-add-office',
  templateUrl: './add-office.component.html',
  styleUrls: ['./add-office.component.scss']
})
export class AddOfficeComponent {
  myForm: FormGroup | any;
  id:any;
  locations1:any=[];
  constructor(private apiservice: ApiserviceService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.apiservice.view_city().subscribe((res) => {
      this.locations1 = res;
    });
    this.myForm = new FormGroup(
      {
        hname: new FormControl('', Validators.required),
        hplace: new FormControl('', Validators.required),
        location: new FormControl('', Validators.required),
      }
    );
    this.apiservice.view_offices_id(this.id).subscribe((res:any) => {
      if(res.status=='ok'){
        this.myForm.get('hname').setValue(res.hname);
        this.myForm.get('hplace').setValue(res.hplace);
        this.myForm.get('location').setValue(res.location);
      }
    })
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    // alert('Data Added Successfully');
    if (this.myForm.valid) {
      this.apiservice.add_office(
        this.myForm.get('hname').value,
        this.myForm.get('hplace').value,
        this.id,
        this.myForm.get('location').value
        ).subscribe((res: any) => {
        if(res.status=='ok'){
          Swal.fire({
            title: 'Office Added Successfully',
            icon: 'success',
          })
          this.myForm.reset();
          location.href="/offices"
        }
        else{
          Swal.fire({
            title: 'Office Already Exist',
            icon: 'warning',
          })
        }
      })
    }
  }
}
