import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.scss']
})
export class ExpenseReportComponent {
  constructor(private apiservice: ApiserviceService, private router: Router,
    private route: ActivatedRoute, private fb: FormBuilder) { }
  myForm: FormGroup | any;
  prod_names: any;
  id: any;

  ngOnInit(): void {
    this.apiservice.view_names().subscribe((res) => {
      this.prod_names = res;
    });
    this.id = this.route.snapshot.params['id'] || null;
    this.myForm = new FormGroup(
      {
        loadRows: this.fb.array([]),
        dieselRows: this.fb.array([]),
        rtoRows: this.fb.array([]),
        miscRows: this.fb.array([]),
        // adv_date: new FormControl('', Validators.required),
        lorry_no: new FormControl('', Validators.required),
        adv_amount: new FormControl('', Validators.required),
        start_km: new FormControl('', Validators.required),
        end_km: new FormControl('', Validators.required),
        run_km: new FormControl('', Validators.required),
        diesel: new FormControl('', Validators.required),
        mileage: new FormControl('', Validators.required),
        driver: new FormControl('', Validators.required),
        cleaner: new FormControl('', Validators.required),
        from_date: new FormControl('', Validators.required),
        to_date: new FormControl('', Validators.required),
        bill: new FormControl('', Validators.required),
        pc_charge: new FormControl('', Validators.required),
      }
    );
  }
  fetchLoad() {
    const lorry_no = this.myForm.get('lorry_no').value;
    const from_date = this.myForm.get('from_date').value;
    const to_date = this.myForm.get('to_date').value;
    if (lorry_no && from_date && to_date) {
      this.apiservice.view_load([lorry_no, from_date, to_date]).subscribe((res: any) => {
        if (res.length > 0) {
          this.setLoadRowsdata(res);
        }
      });
    }
  }
  balance_km() {
    this.myForm.get('run_km').setValue(this.myForm.get('end_km').value - this.myForm.get('start_km').value);
    const mileage = Math.round((this.myForm.get('run_km').value / this.myForm.get('diesel').value) * 100) / 100;
    this.myForm.get('mileage').setValue(mileage);
  }
  // Method to get the FormArray
  get loadRows(): FormArray {
    return this.myForm.get('loadRows') as FormArray;
  }
  get dieselRows(): FormArray {
    return this.myForm.get('dieselRows') as FormArray;
  }
  get rtoRows(): FormArray {
    return this.myForm.get('rtoRows') as FormArray;
  }
  get miscRows(): FormArray {
    return this.myForm.get('miscRows') as FormArray;
  }
  setLoadRowsdata(datas: any) {
    this.loadRows.clear();
    datas.forEach((data: any) => {
      this.loadRows.push(this.fb.group({
        date: [data.date],
        startLocation: [data.startLocation],
        endLocation: [data.endLocation],
        load: [data.load],
        ton: [data.ton],
        freight: [data.freight],
        commission: [data.commission],
        loadCharge: [data.loadCharge],
        unloadCharge: [data.unloadCharge]
      }));
    });
  }
  // Method to add a new row
  addLoadRow() {
    this.loadRows.push(this.fb.group({
      date: [''],
      startLocation: [''],
      endLocation: [''],
      load: [''],
      ton: [''],
      freight: [''],
      commission: [''],
      loadCharge: [''],
      unloadCharge: ['']
    }));
  }
  delLoadRow(i: any) {
    this.loadRows.removeAt(i);
  }
  addDieselRow() {
    this.dieselRows.push(this.fb.group({
      date: [''],
      qty: [''],
      amount: [''],
    }));
  }
  delDieselRow(i: any) {
    this.dieselRows.removeAt(i);
  }
  addRtoRow() {
    this.rtoRows.push(this.fb.group({
      location: [''],
      up: [''],
      down: [''],
    }));
  }
  delRtoRow(i: any) {
    this.rtoRows.removeAt(i);
  }
  addMiscRow() {
    this.miscRows.push(this.fb.group({
      particular: [''],
      amount: [''],
    }));
  }
  delMiscRow(i: any) {
    this.miscRows.removeAt(i);
  }
  // Method to calculate the total for a given column
  getTotal(id: any, column: string): number {
    switch (id) {
      case 1:
        {
          return this.loadRows.controls.reduce((total, control) => {
            return total + (control.get(column)?.value || 0);
          }, 0);
        }
      case 2:
        {
          return this.dieselRows.controls.reduce((total, control) => {
            return total + (control.get(column)?.value || 0);
          }, 0);
        }
      case 3:
        {
          return this.rtoRows.controls.reduce((total, control) => {
            return total + (control.get(column)?.value || 0);
          }, 0);
        }
      case 4:
        {
          return this.miscRows.controls.reduce((total, control) => {
            return total + (control.get(column)?.value || 0);
          }, 0);
        }
      default:
        return 0;
    }
  }
  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.loadRows.value);
    // if (this.myForm.valid) {
    //   var data = Array();
    //   data.push(this.myForm.get('adv_date').value);
    //   data.push(this.myForm.get('lorry_no').value);
    //   data.push(this.myForm.get('adv_amount').value);
    //   data.push(this.myForm.get('pay_mode').value);
    //   data.push(this.id);
    //   this.apiservice.add_advance(data).subscribe((res: any) => {
    //     Swal.fire({
    //       title: 'Advance Added Successfully',
    //       icon: 'success',
    //     });
    //     this.router.navigate(['advances'])
    //   });
    // }
  }
}
