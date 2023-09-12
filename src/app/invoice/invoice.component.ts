import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {
  constructor(private apiservice: ApiserviceService, private router: Router, private route: ActivatedRoute) { }
  id: any;
  table_data: any;
  total: any;
  gst_value: any;
  subtotal: any;
  roundoff: any;
  before: any;
  words = 'Rupees';
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.apiservice.view_invoice(this.id).subscribe((res: any) => {
      if (res.status == 'ok') {
        this.table_data = res;
        this.subtotal = (+res.mrd + +res.transport + +res.fees).toFixed(2);
        this.gst_value = (+res.fees * 0.18).toFixed(2);
        this.before = (+this.subtotal + +this.gst_value).toFixed(2);
        this.total = Math.round(+this.subtotal + +this.gst_value).toFixed(2);
        this.roundoff = (this.total - this.before).toFixed(2);
        this.words = this.number2words(this.total);
      }
    });
  }
  ngAfterViewInit() {
    var elem = <HTMLElement>document.querySelector('body');
    elem.style.backgroundImage = 'none';
    elem.style.background = '#525252';
  }
  async downloadPdf() {
    let width = document.querySelector('#invoice')!.clientWidth + 1;
    let height = document.querySelector('#invoice')!.clientHeight + 1;
    let doc = new jsPDF('p', 'px', [width, height]);
    await doc.html(document.querySelector('#invoice') as HTMLElement)
    doc.output('pdfobjectnewwindow');
  }

  number2words(n: any): any {
    var num = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");
    var tens = "twenty thirty forty fifty sixty seventy eighty ninety".split(" ");
    if (n < 20) return num[n];
    var digit = n % 10;
    if (n < 100) return tens[~~(n / 10) - 2] + (digit ? "-" + num[digit] : "");
    if (n < 1000) return num[~~(n / 100)] + " hundred" + (n % 100 == 0 ? "" : " " + this.number2words(n % 100));
    return this.number2words(~~(n / 1000)) + " thousand" + (n % 1000 != 0 ? " " + this.number2words(n % 1000) : "");
  }
}
