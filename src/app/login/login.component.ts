import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  myForm: FormGroup | any;
  constructor(private apiservice: ApiserviceService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.apiservice.checking().subscribe((res: any) => {
      if (res.status == 'error') {
      }
      if (res.status == 'ok') {
        location.href='/advance-pending'
        // this.router.navigate(['advance-pending']);
      }
    })
    this.myForm = new FormGroup(
      {
        username: new FormControl(''),
        password: new FormControl('')
      }
    );
  }
  onSubmit() {
    console.log(this.myForm.get('username').value)
    this.apiservice.signin(
      this.myForm.get('username').value,
      this.myForm.get('password').value
    ).subscribe((res:any) => {
      if(res.status=='ok'){
        this.apiservice.settoken(res.token);
        location.href='/advance-pending'
        // this.router.navigate(['advance-pending']);
      }
    })
  }
}
