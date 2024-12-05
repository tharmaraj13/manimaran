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
  taxRate: any = 0;

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
        lorry_no: new FormControl('', Validators.required),
        adv_amount: new FormControl('', Validators.required),
        start_km: new FormControl('', Validators.required),
        end_km: new FormControl('', Validators.required),
        run_km: new FormControl(0, Validators.required),
        diesel: new FormControl(0, Validators.required),
        mileage: new FormControl(0, Validators.required),
        driver1: new FormControl('', Validators.required),
        driver2: new FormControl('', Validators.required),
        from_date: new FormControl('', Validators.required),
        to_date: new FormControl('', Validators.required),
        bill: new FormControl('', Validators.required),
        pc_charge: new FormControl('', Validators.required),
        rto_charge: new FormControl(0, Validators.required),
        diesel_amount: new FormControl(0, Validators.required),
        departure: new FormControl('', Validators.required),
        via: new FormControl('', Validators.required),
        destination: new FormControl('', Validators.required),
        load_details: new FormControl('', Validators.required),
        weight_details: new FormControl('', Validators.required),
        freight_charges: new FormControl(0, Validators.required),
        loading_charges: new FormControl(0, Validators.required),
        unloading_charges: new FormControl(0, Validators.required),
        misc_charges: new FormControl(0, Validators.required),
        driver_wages: new FormControl(0, Validators.required),
        total_exp: new FormControl(0, Validators.required),
        balance: new FormControl(0, Validators.required),
      }
    );
    this.subscribeToDieselRows();
    if (this.id) {
      this.apiservice.view_expense_id(this.id).subscribe((res: any) => {
        if (res.status == 'ok') {
          this.myForm.patchValue(res.data);
          this.setDieselRowsdata(res?.dieselRows || []);
          this.setRtoRowsdata(res?.rtoRows || []);
          this.setMiscRowsdata(res?.miscRows || []);
          this.fetchLoad();
        }
      });
    }
  }
  fetchLoad() {
    const lorry_no = this.myForm.get('lorry_no').value;
    const from_date = this.myForm.get('from_date').value;
    const to_date = this.myForm.get('to_date').value;
    if (lorry_no && from_date && to_date) {
      this.apiservice.view_load([lorry_no, from_date, to_date, this.id]).subscribe((res: any) => {
        if (res.length > 0) {
          this.taxRate = res[0].taxRate;
          this.setLoadRowsdata(res);
        }
      });
    }
  }
  subscribeToDieselRows() {
    this.dieselRows.valueChanges.subscribe(() => {
      this.updateDieselValues();
    });
    this.rtoRows.valueChanges.subscribe(() => {
      this.updateRtoValues();
    });
    this.loadRows.valueChanges.subscribe(() => {
      this.updateLoadValues();
    });
    this.miscRows.valueChanges.subscribe(() => {
      this.updateMiscValues();
    });
  }
  updateDieselValues() {
    const totalDiesel = this.getTotal(2, 'qty');
    const totalAmt = this.getTotal(2, 'amount');
    this.myForm.get('diesel')?.setValue(totalDiesel, { emitEvent: false }); // Prevent re-triggering the valueChanges event
    this.myForm.get('diesel_amount')?.setValue(totalAmt, { emitEvent: false }); // Prevent re-triggering the valueChanges event
    this.balance_km();
    this.calculate_total();
  }
  updateRtoValues() {
    const total = this.getTotal(3, 'up') + this.getTotal(3, 'down');
    this.myForm.get('rto_charge')?.setValue(total, { emitEvent: false }); // Prevent re-triggering the valueChanges event
    this.calculate_total();
  }
  updateMiscValues() {
    const total = this.getTotal(4, 'amount');
    this.myForm.get('misc_charges')?.setValue(total, { emitEvent: false }); // Prevent re-triggering the valueChanges event
    this.calculate_total();
  }
  updateLoadValues() {
    let departure = '';
    let destination = '';
    let via = '';
    let load = '';
    let ton = '';
    let freight = 0;
    let loading_charges = 0;
    let unloading_charges = 0;
    let driver_wages = 0;
    const loadData = this.loadRows.value;
    // Check if the data is not empty
    if (loadData.length > 0) {
      departure = loadData[0].startLocation; // First element's startLocation
      destination = loadData[loadData.length - 1].endLocation; // Last element's endLocation
      via = loadData.slice(0, -1).map((item: any) => item.endLocation).join("\n");
      load = loadData.map((item: any) => item.load).join("\n");
      ton = loadData.map((item: any) => item.ton).join("\n");
      freight = this.getTotal(1, 'freight');
      driver_wages = Math.round(freight * this.taxRate) / 100;
      loading_charges = this.getTotal(1, 'loadCharge');
      unloading_charges = this.getTotal(1, 'unloadCharge');
    }
    this.myForm.get('departure')?.setValue(departure, { emitEvent: false }); // Prevent re-triggering the valueChanges event
    this.myForm.get('destination')?.setValue(destination, { emitEvent: false }); // Prevent re-triggering the valueChanges event
    this.myForm.get('via')?.setValue(via, { emitEvent: false }); // Prevent re-triggering the valueChanges event
    this.myForm.get('load_details')?.setValue(load, { emitEvent: false }); // Prevent re-triggering the valueChanges event
    this.myForm.get('weight_details')?.setValue(ton, { emitEvent: false }); // Prevent re-triggering the valueChanges event
    this.myForm.get('freight_charges')?.setValue(freight, { emitEvent: false }); // Prevent re-triggering the valueChanges event
    this.myForm.get('loading_charges')?.setValue(loading_charges, { emitEvent: false }); // Prevent re-triggering the valueChanges event
    this.myForm.get('unloading_charges')?.setValue(unloading_charges, { emitEvent: false }); // Prevent re-triggering the valueChanges event
    this.myForm.get('driver_wages')?.setValue(driver_wages, { emitEvent: false }); // Prevent re-triggering the valueChanges event
    this.calculate_total();
  }
  balance_km() {
    if (this.myForm.get('start_km').value && this.myForm.get('end_km').value) {
      this.myForm.get('run_km').setValue(this.myForm.get('end_km').value - this.myForm.get('start_km').value);
    }
    if (this.myForm.get('diesel').value) {
      const mileage = Math.round((this.myForm.get('run_km').value / this.myForm.get('diesel').value) * 100) / 100;
      this.myForm.get('mileage').setValue(mileage);
    }
  }
  calculate_total() {
    const total = this.myForm.get('diesel_amount').value +
      +this.myForm.get('loading_charges').value +
      +this.myForm.get('unloading_charges').value +
      +this.myForm.get('misc_charges').value +
      +this.myForm.get('rto_charge').value +
      +this.myForm.get('pc_charge').value +
      +this.myForm.get('bill').value +
      +this.myForm.get('driver_wages').value;
    this.myForm.get('total_exp').setValue(total);
    const balance = this.myForm.get('total_exp').value - this.myForm.get('adv_amount').value;
    this.myForm.get('balance').setValue(balance);
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
  setDieselRowsdata(datas: any) {
    this.dieselRows.clear();
    datas.forEach((data: any) => {
      this.dieselRows.push(this.fb.group({
        date: [data.date],
        qty: [Number(data.qty)],
        amount: [Number(data.amount)],
      }));
    });
  }
  setRtoRowsdata(datas: any) {
    this.rtoRows.clear();
    datas.forEach((data: any) => {
      this.rtoRows.push(this.fb.group({
        location: [data.location],
        up: [Number(data.up)],
        down: [Number(data.down)],
      }));
    });
  }
  setMiscRowsdata(datas: any) {
    this.miscRows.clear();
    datas.forEach((data: any) => {
      this.miscRows.push(this.fb.group({
        particular: [data.particular],
        amount: [Number(data.amount)],
      }));
    });
  }
  setLoadRowsdata(datas: any) {
    this.loadRows.clear();
    datas.forEach((data: any) => {
      this.loadRows.push(this.fb.group({
        id: [data.id],
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
      id: [''],
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
    const formData = { ...this.myForm.value };
    const testData = formData.loadRows.map((e: any) => ({ lorry_details_id: e.id, loading_charge: e.loadCharge, unloading_charge: e.unloadCharge }));
    formData.loadRows = testData;
    console.log(formData);
    if (this.myForm.valid) {
      var data = Array();
      data.push(formData);
      data.push(this.id);
      this.apiservice.add_expense(data).subscribe((res: any) => {
        Swal.fire({
          title: 'Expense Added Successfully',
          icon: 'success',
        });
        this.router.navigate(['expenses']);
      });
    }
  }
}
