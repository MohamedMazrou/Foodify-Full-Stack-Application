import { Component } from '@angular/core';
import { LayoutAuthComponent } from "../../../components/sideBarAuth/layout-sidebar.component";
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from "../../../pages/sign-in/sign-in.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [LayoutAuthComponent, RouterOutlet, SignInComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
