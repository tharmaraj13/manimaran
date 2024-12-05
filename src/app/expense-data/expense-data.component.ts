import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-expense-data',
  templateUrl: './expense-data.component.html',
  styleUrls: ['./expense-data.component.scss']
})
export class ExpenseDataComponent {
  constructor(private apiservice: ApiserviceService, private router: Router, private route: ActivatedRoute) { }
  dtOptions: any;
  table_data: any = Array();
  sub_total: any = 0.00;

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 30,
      processing: false,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ]
    };
    this.apiservice.view_expense_all().subscribe((res: any) => {
      this.table_data = res.data;
    });
  }
  getTotal(col: any) {
    const total = this.table_data.reduce((a: any, b: any) => {
      return +a + +b[col];
    }, 0);
    return total.toFixed(2);
  }
  remove(id: any) {
    var result = confirm("Are You sure?");
    if (result) {
      this.apiservice.del_expense(id).subscribe((res) => {
        location.reload();
      })
    }
  }
  transform(value: string): string {
    return value ? value.replace(/\n/g, ', ') : value;
  }
}
