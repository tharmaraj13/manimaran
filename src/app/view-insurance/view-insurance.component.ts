import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-view-insurance',
  templateUrl: './view-insurance.component.html',
  styleUrls: ['./view-insurance.component.scss']
})
export class ViewInsuranceComponent {
  table_data: any;
  constructor(private apiservice:ApiserviceService) {}
  ngAfterViewInit(): void{
    this.apiservice.view_insurance().subscribe((res) => {
      this.table_data = res;
    })
  }
  remove(id:any) {
    var result = confirm("Are You sure?");
    if (result) {
      this.apiservice.del_insurance(id).subscribe((res) => {
        location.reload();
      })
    }
  }
}
