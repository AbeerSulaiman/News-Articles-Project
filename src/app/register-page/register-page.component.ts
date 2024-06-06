import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NewsServiceService } from '../service/news.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  constructor(private service: NewsServiceService, private toast: HotToastService, private router: Router, private route: ActivatedRoute) {
    this.createUserForm();
  }
  registerUserForm = new UntypedFormGroup({});
  isSubmit: boolean = false;

  get Name() { return this.registerUserForm.get('Name')}
  get Password() { return this.registerUserForm.get('Password')}
  get Email() { return this.registerUserForm.get('Email')}
  get NId() { return this.registerUserForm.get('NId')}
  get DateOfBirth() { return this.registerUserForm.get('DateOfBirth')}
  get UserName() { return this.registerUserForm.get('UserName')}

  ngOnInit() {
    this.getUsers();
  }
   
  getUsers() {
    this.service.GetRegisteredUser().subscribe((data: any) => {
      console.log(data);
      
    })
  }
  createUserForm() {
    this.registerUserForm = new UntypedFormGroup({
      id: new FormControl(null),
      Name: new FormControl(null, [Validators.required]),
      Password: new FormControl(null,[Validators.required]),
      Email: new FormControl(null, [Validators.required]),
      NId: new FormControl(null, [Validators.required]),
      DateOfBirth: new FormControl(null, [Validators.required]),
      UserName: new FormControl(null, [Validators.required]),
    });
  }
  newRegister() {
    const formValues: any = {
      Name: this.registerUserForm.value.Name,
      Password: this.registerUserForm.value.Password,
      Email: this.registerUserForm.value.Email,
      NId: this.registerUserForm.value.NId,
      DateOfBirth: this.registerUserForm.value.DateOfBirth,
      UserName: this.registerUserForm.value.UserName,
    }
    if (this.registerUserForm.valid){
      this.service.registerUser(formValues).subscribe((data: any) => {
        if (data.data) {
          this.toast.success(data.message);
          this.isSubmit = true;
          this.registerUserForm.reset();
        }
        this.router.navigate(['../login'])
      }, (err) => {
        this.toast.error(err.error.message)
      })
    }
  }
}
