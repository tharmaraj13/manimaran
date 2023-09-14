import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent {
  myForm: FormGroup | any;
  prod_names: any;
  insurance: any;
  office_names: any;
  flocations:any=[];
  tlocations:any=[];
  locations1:any=[];
  id:any;
  constructor(private apiservice: ApiserviceService, private router: Router,private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.apiservice.view_names().subscribe((res) => {
      this.prod_names = res;
    });
    this.apiservice.view_offices().subscribe((res) => {
      this.office_names = res;
    });
    this.apiservice.view_city().subscribe((res) => {
      this.locations1 = res;
    });
    this.id = this.route.snapshot.params['id'];
    this.myForm = new FormGroup(
      {
        load_date: new FormControl('', Validators.required),
        lorry_no: new FormControl('', Validators.required),
        office_no: new FormControl('', Validators.required),
        from: new FormControl('', Validators.required),
        to: new FormControl('', Validators.required),
        load_type: new FormControl('', Validators.required),
        weight: new FormControl('', Validators.required),
        freight: new FormControl('', Validators.required),
        advance_date: new FormControl(''),
        advance_amt: new FormControl(''),
        advance_paid: new FormControl(''),
        commission: new FormControl(''),
        loading_charge: new FormControl(''),
        mamul: new FormControl(''),
        delivery_date: new FormControl(''),
        payment_date: new FormControl(''),
        payment_amt: new FormControl(''),
        account_name: new FormControl(''),
        remarks: new FormControl(''),
        other_amt: new FormControl(''),
        balance: new FormControl(''),
        account_name_ad: new FormControl(''),
      }
    );
    this.apiservice.view_sales_id(this.id).subscribe((res:any) => {
      if(res.status=='ok'){
        this.myForm.get('load_date').setValue(res.load_date);
        this.myForm.get('lorry_no').setValue(res.lorry_no);
        this.myForm.get('office_no').setValue(res.office_no);
        this.myForm.get('from').setValue(res.from);
        this.myForm.get('to').setValue(res.to);
        this.myForm.get('load_type').setValue(res.load_type);
        this.myForm.get('weight').setValue(res.weight);
        this.myForm.get('freight').setValue(res.freight);
        this.myForm.get('advance_date').setValue(res.advance_date);
        this.myForm.get('advance_amt').setValue(res.advance_amt);
        this.myForm.get('advance_paid').setValue(res.advance_paid);
        this.myForm.get('commission').setValue(res.commission);
        this.myForm.get('loading_charge').setValue(res.loading_charge);
        this.myForm.get('mamul').setValue(res.mamul);
        this.myForm.get('delivery_date').setValue(res.delivery_date);
        this.myForm.get('payment_date').setValue(res.payment_date);
        this.myForm.get('payment_amt').setValue(res.payment_amt);
        this.myForm.get('account_name').setValue(res.account_name);
        this.myForm.get('remarks').setValue(res.remarks);
        this.myForm.get('other_amt').setValue(res.other_amt);
        this.myForm.get('account_name_ad').setValue(res.account_name_ad);
        this.balance_amt()
      }
    })
  }
  balance_amt(){
    this.myForm.get('balance').setValue(this.myForm.get('freight').value - this.myForm.get('advance_amt').value);
  }
  autofill(e: any) {
    this.myForm.get('from').setValue(e.target.innerHTML);
    this.flocations = [];
  }
  searching(e: any) {
    this.flocations=this.locations1.filter((d:any) => {
      return d.name.includes(e.target.value);
    });
  }
  autofill1(e: any) {
    this.myForm.get('to').setValue(e.target.innerHTML);
    this.tlocations = [];
  }
  searching1(e: any) {
    this.tlocations=this.locations1.filter((d:any) => {
      return d.name.includes(e.target.value);
    });
  }
  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log('Advance Date',this.myForm.get('advance_date').value);
    if (this.myForm.valid) {
      var data = Array();
      data.push(this.myForm.get('load_date').value);
      data.push(this.myForm.get('lorry_no').value);
      data.push(this.myForm.get('from').value);
      data.push(this.myForm.get('to').value);
      data.push(this.myForm.get('load_type').value);
      data.push(this.myForm.get('weight').value);
      data.push(this.myForm.get('freight').value);
      data.push(this.myForm.get('advance_amt').value);
      data.push(this.myForm.get('advance_date').value);
      data.push(this.myForm.get('commission').value);
      data.push(this.myForm.get('loading_charge').value);
      data.push(this.myForm.get('mamul').value);
      data.push(this.myForm.get('delivery_date').value);
      data.push(this.myForm.get('payment_amt').value);
      data.push(this.myForm.get('payment_date').value);
      data.push(this.myForm.get('account_name').value);
      data.push(this.myForm.get('advance_paid').value);
      data.push(this.id);
      data.push(this.myForm.get('office_no').value);
      data.push(this.myForm.get('remarks').value);
      data.push(this.myForm.get('other_amt').value);
      data.push(this.myForm.get('account_name_ad').value);
      this.apiservice.add_products(data).subscribe((res: any) => {
        Swal.fire({
          title: 'Intimation Added Successfully',
          icon: 'success',
        })
        if(this.myForm.get('advance_date').value=='' && this.myForm.get('payment_date').value==''){
          this.router.navigate(['advance-pending'])
        }
        else if(this.myForm.get('payment_date').value==''){
          this.router.navigate(['payment-pending'])
        }
        else{
          this.router.navigate(['consolidated'])
        }
      });
    }
  }
}
