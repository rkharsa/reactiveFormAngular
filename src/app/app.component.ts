import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loginCtrl: FormControl;
  birthYearCtrl: FormControl;
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  userForm: FormGroup;
  passwordForm: FormGroup;
  static passwordMatch(group: FormGroup) {
    const password = group.get('password').value;
    const confirm = group.get('confirmPassword').value;
    return password === confirm ? null : { matchingError: true };
  }
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.confirmPasswordCtrl = this.formBuilder.control('', Validators.required);
    this.passwordCtrl = this.formBuilder.control('', Validators.required);
    this.loginCtrl = this.formBuilder.control('', Validators.required);
    this.birthYearCtrl = this.formBuilder.control('', Validators.required);

    this.passwordForm = this.formBuilder.group({
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }, {
      validators: AppComponent.passwordMatch
    });


    this.userForm = this.formBuilder.group({
      login: this.loginCtrl,
      passwordForm: this.passwordForm,
      birthYear: this.birthYearCtrl,
    });
  }

  onSubmitForm() {
    const formValue = this.userForm.value;

    console.log("form value");
    console.log(formValue);

  }
  resetForm() {
    this.userForm.reset({ login: '', passwordForm: { password: '', confirmPassword: '' }, birthYear: '' });
  }
}
