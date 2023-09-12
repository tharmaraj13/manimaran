import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.scss']
})
export class ViewLocationComponent {
  table_data: any;
  dtOptions:any;
  constructor(private apiservice:ApiserviceService) {}
  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      processing: false,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };
  }
  ngAfterViewInit(): void{
    this.apiservice.view_city().subscribe((res) => {
      this.table_data = res;
    })
  }
  remove(id:any) {
    var result = confirm("Are You sure?");
    if (result) {
      this.apiservice.del_city(id).subscribe((res) => {
        location.reload();
      })
    }
  }
}
