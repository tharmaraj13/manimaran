import { Component } from '@angular/core';
import Docxtemplater from "docxtemplater";
import * as PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';

function loadFile(url: any, callback: any) {
  PizZipUtils.getBinaryContent(url, callback);
}

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent {
  id: any;
  table_data: any;
  cases = [
    ['gen_doctor.docx', 'gen_insured.docx'],
    ['ped_doctor.docx', 'ped_insured.docx'],
    ['accident_doctor.docx', 'accident_insured.docx'],
    ['infertile_doctor.docx', 'infertile_insured.docx'],
    ['opd_doctor.docx', 'opd_insured.docx']
  ];
  docx: any;
  constructor(private apiservice: ApiserviceService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.apiservice.view_details(this.id).subscribe((res: any) => {
      this.table_data = res
      if (res.status == 'ok') {
        this.docx = this.cases[res.caseno]
      }
    })
  }
  invoice() {
    location.href = '/invoice/' + this.table_data.gicsid;
  }
  downloading1() {
    loadFile(
      "assets/template/final_report.docx",
      (error: any, content: any) => {
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render(this.table_data);
        const blob = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        // Output the document using Data-URI
        saveAs(blob, "final_report.docx");
      }
    );
  }
  downloading2() {
    loadFile(
      "assets/template/" + this.docx[0],
      (error: any, content: any) => {
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render(this.table_data);
        const blob = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        // Output the document using Data-URI
        saveAs(blob, this.docx[0]);
      }
    );
  }
  downloading3() {
    loadFile(
      "assets/template/" + this.docx[1],
      (error: any, content: any) => {
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render(this.table_data);
        const blob = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        // Output the document using Data-URI
        saveAs(blob, this.docx[1]);
      }
    );
  }

}
