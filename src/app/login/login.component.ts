/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../storage/localstorage.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private storage: LocalStorageService
  ) {
    this.loginForm = this.fb.group({
      grant_type: ['password'],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  login() {
    this.loginService.login(this.loginForm.value).subscribe(
      (res) => {
        this.storage.userToken.next(res);
        // this.noti.showSuccess("Đăng nhập thành công!");
        this.storage.setObject('access_token', res);
        // this.loading.closeLoading();
        this.router.navigate(['']);
      },
      (err) => {
        // this.loading.closeLoading();
        // this.noti.showError(`Đăng nhập thất bại! ${err.message}`);
      }
    );
  }
}
