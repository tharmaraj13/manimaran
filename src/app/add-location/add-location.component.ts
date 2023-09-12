import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent {
  myForm: FormGroup | any;
  id: any;
  states: any;
  result: any;
  constructor(private apiservice: ApiserviceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.myForm = new FormGroup(
      {
        hname: new FormControl('', Validators.required),
        hplace: new FormControl('', Validators.required),
      }
    );
    this.apiservice.view_city_id(this.id).subscribe((res: any) => {
      this.states = res.data;
      if (res.status == 'ok') {
        this.myForm.get('hname').setValue(res.hname);
        this.myForm.get('hplace').setValue(res.hplace);
      }
    });
  }
  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      this.apiservice.add_city(this.myForm.get('hname').value, this.myForm.get('hplace').value, this.id).subscribe((res: any) => {
        if (res.status == 'ok') {
          Swal.fire({
            title: 'City Added Successfully',
            icon: 'success',
          })
          this.myForm.reset();
          location.href = "/cities"
        }
        else {
          Swal.fire({
            title: 'City Already Exist',
            icon: 'warning',
          })
        }
      })
    }
  }
}
