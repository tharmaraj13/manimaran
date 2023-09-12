import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrls: ['./view-vendor.component.scss']
})
export class ViewVendorComponent {
  table_data: any;
  constructor(private apiservice:ApiserviceService) {}
  ngAfterViewInit(): void{
    this.apiservice.view_vendors().subscribe((res) => {
      this.table_data = res;
    })
  }
  remove(id:any) {
    var result = confirm("Are You sure?");
    if (result) {
      this.apiservice.del_vendors(id).subscribe((res) => {
        location.reload();
      })
    }
  }
}
