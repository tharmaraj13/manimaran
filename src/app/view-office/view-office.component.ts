import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-view-office',
  templateUrl: './view-office.component.html',
  styleUrls: ['./view-office.component.scss']
})
export class ViewOfficeComponent {
  table_data: any;
  dtOptions:any;
  constructor(private apiservice:ApiserviceService) {}
  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: false,
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };
  }
  ngAfterViewInit(): void{
    this.apiservice.view_offices().subscribe((res) => {
      this.table_data = res;
    })
  }
  remove(id:any) {
    var result = confirm("Are You sure?");
    if (result) {
      this.apiservice.del_office(id).subscribe((res) => {
        location.reload();
      })
    }
  }
}
