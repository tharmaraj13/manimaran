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
  ngAfterViewInit(){
    document.querySelector('#show_hide_password a')!.addEventListener('click',()=>{
      if((<HTMLInputElement>document.querySelector('#show_hide_password input')).type=='text'){
        (<HTMLInputElement>document.querySelector('#show_hide_password input')).type='password';
        document.querySelector('#show_hide_password i')!.classList.add('bx-hide');
        document.querySelector('#show_hide_password i')!.classList.remove('bx-show');
      }
      else if((<HTMLInputElement>document.querySelector('#show_hide_password input')).type=='password'){
        (<HTMLInputElement>document.querySelector('#show_hide_password input')).type='text';
        document.querySelector('#show_hide_password i')!.classList.remove('bx-hide');
        document.querySelector('#show_hide_password i')!.classList.add('bx-show');
      }
    });
  }
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
