import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NewsServiceService } from '../service/news.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
constructor(private service: NewsServiceService, private toast: ToastrService, private router: Router, private route: ActivatedRoute){
  this.createLoginForm();
}
loginForm = new UntypedFormGroup({});
isSubmit: boolean = false;

get Password() { return this.loginForm.get('Password')}
get UserName() { return this.loginForm.get('UserName')}

  createLoginForm() {
    this.loginForm = new UntypedFormGroup({
      Password: new FormControl(null,[Validators.required]),
      UserName: new FormControl(null, [Validators.required]),
    });
  }
  onLogin() {
    const formValues: any = {
      Password: this.loginForm.value.Password,
      UserName: this.loginForm.value.UserName,
    }
    if (this.loginForm.valid){
      this.service.loginUser(formValues).subscribe((data: any) => {
        console.log(data);
        if (data.data) {
          this.toast.success('Login successfully!');
          this.isSubmit = true;
          this.loginForm.reset(); 
        }
        this.router.navigate(['../home']);
      }, (err) => {
        this.toast.error(err.error.message || 'Error Occurred')
      })
    }
  }
}
