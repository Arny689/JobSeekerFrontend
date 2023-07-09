import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HandletokenService } from '../services/handletoken.service';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {

  form: any

  constructor(
    private fb: FormBuilder,
    private tokenService: HandletokenService,
    private routes: Router
    ) {

    this.form = fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    })
  }

  get fc() {
    return this.form.controls
  }

  async login() {
    const value = this.form.value
    if (!(value.email || value.password)) return;
    const isAuthorized = await this.tokenService.authorize(value.email, value.password)
    if (!isAuthorized) return;
    this.routes.navigateByUrl('mainpage')
  }
}
