import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
  myForm: FormGroup | any;
  constructor(private apiservice: ApiserviceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.myForm = new FormGroup(
      {
        iname: new FormControl('', Validators.required),
        pan: new FormControl('', Validators.required),
        gstin: new FormControl('', Validators.required),
        hsn: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        bank: new FormControl('', Validators.required),
        branch: new FormControl('', Validators.required),
        accno: new FormControl('', Validators.required),
        ifsc: new FormControl('', Validators.required)
      }
    );
    this.apiservice.view_company().subscribe((res: any) => {
      if (res.status == 'ok') {
        this.myForm.get('iname').setValue(res.iname);
        this.myForm.get('pan').setValue(res.pan);
        this.myForm.get('gstin').setValue(res.gstin);
        this.myForm.get('hsn').setValue(res.hsn);
        this.myForm.get('description').setValue(res.description);
        this.myForm.get('bank').setValue(res.bank);
        this.myForm.get('branch').setValue(res.branch);
        this.myForm.get('accno').setValue(res.accno);
        this.myForm.get('ifsc').setValue(res.ifsc);
      }
    })
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    // alert('Data Added Successfully');
    if (this.myForm.valid) {
      this.apiservice.add_company(
        this.myForm.get('iname').value,
        this.myForm.get('pan').value,
        this.myForm.get('gstin').value,
        this.myForm.get('hsn').value,
        this.myForm.get('description').value,
        this.myForm.get('bank').value,
        this.myForm.get('branch').value,
        this.myForm.get('accno').value,
        this.myForm.get('ifsc').value
      ).subscribe((res: any) => {
        if (res.status == 'ok') {
          Swal.fire({
            title: 'Company Details Added Successfully',
            icon: 'success',
          })
        }
      })
    }
  }
}
