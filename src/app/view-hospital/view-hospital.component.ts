import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-view-hospital',
  templateUrl: './view-hospital.component.html',
  styleUrls: ['./view-hospital.component.scss']
})
export class ViewHospitalComponent {
  table_data: any;
  constructor(private apiservice:ApiserviceService) {}
  ngAfterViewInit(): void{
    this.apiservice.view_names().subscribe((res) => {
      this.table_data = res;
    })
  }
  remove(id:any) {
    var result = confirm("Are You sure?");
    if (result) {
      this.apiservice.del_hospital(id).subscribe((res) => {
        location.reload();
      })
    }
  }
}
