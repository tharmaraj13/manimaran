import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent {
  constructor(private apiservice: ApiserviceService, private router: Router, private route: ActivatedRoute) { }
  myForm: FormGroup | any;
  prod_names: any;
  services: any;
  id: any;

  ngOnInit(): void {
    this.apiservice.view_names().subscribe((res) => {
      this.prod_names = res;
    });
    this.apiservice.view_services().subscribe((res) => {
      this.services = res;
    });
    this.id = this.route.snapshot.params['id'];
    this.myForm = new FormGroup(
      {
        adv_date: new FormControl('', Validators.required),
        lorry_no: new FormControl('', Validators.required),
        adv_amount: new FormControl('', Validators.required),
        remarks: new FormControl('', Validators.required),
      }
    );
  }
  ngAfterViewInit() {
    this.apiservice.view_maintenance_id(this.id).subscribe((res: any) => {
      if (res.status == 'ok') {
        this.myForm.get('adv_date').setValue(res.lm_date);
        this.myForm.get('lorry_no').setValue(res.lorry_no);
        this.myForm.get('adv_amount').setValue(res.odometer);
        this.myForm.get('remarks').setValue(res.remarks);
        JSON.parse(res.services).forEach((val: any) => {
          const ele = document.querySelector('#service' + Object.keys(val)[0]) as HTMLInputElement;
          ele.checked=Object.values(val)[0] as boolean;
        });
      }
    });
  }
  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      var data = Array();
      var services_used = Array();
      document.querySelectorAll('input[type="checkbox"]').forEach((e) => {
        const ele = e as HTMLInputElement;
        services_used.push({
          [ele.id.replace('service', '')]: ele.checked
        })
      });

      data.push(this.myForm.get('adv_date').value);
      data.push(this.myForm.get('lorry_no').value);
      data.push(this.myForm.get('adv_amount').value);
      data.push(services_used);
      data.push(this.id);
      data.push(this.myForm.get('remarks').value);
      this.apiservice.add_maintenance(data).subscribe((res: any) => {
        Swal.fire({
          title: 'Maintenance Added Successfully',
          icon: 'success',
        });
        this.router.navigate(['maintenance-list'])
      });
    }
  }
}
