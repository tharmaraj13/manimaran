import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.scss']
})
export class AddServicesComponent {
  myForm: FormGroup | any;
  id: any;
  states: any;
  result: any;
  constructor(private apiservice: ApiserviceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.myForm = new FormGroup(
      {
        service: new FormControl('', Validators.required),
      }
    );
    this.apiservice.view_service_id(this.id).subscribe((res: any) => {
      this.states = res.data;
      if (res.status == 'ok') {
        this.myForm.get('service').setValue(res.service);
      }
    });
  }
  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      this.apiservice.add_service(this.myForm.get('service').value, this.id).subscribe((res: any) => {
        if (res.status == 'ok') {
          Swal.fire({
            title: 'Service Added Successfully',
            icon: 'success',
          })
          this.myForm.reset();
          location.href = "/services-list"
        }
        else {
          Swal.fire({
            title: 'Service Already Exist',
            icon: 'warning',
          })
        }
      })
    }
  }

}
