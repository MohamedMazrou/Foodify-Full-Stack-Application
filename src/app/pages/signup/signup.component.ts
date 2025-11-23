import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private fb: FormBuilder) {}

    signUp = this.fb.group({
    full_name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[A-Za-zأ-يء\s]+$/),
      ],
    ],
    phone_number: [
      '',
      [
    Validators.required,
    Validators.pattern(/^[0-9]{11}$/)
  ],
    ],
    password: [
      '',
      [
    Validators.required,
    Validators.minLength(8)
  ],
],
    confirmPassword: [
      '',
      [
    Validators.required,
    Validators.minLength(8)
  ],
    ],

  });
}
