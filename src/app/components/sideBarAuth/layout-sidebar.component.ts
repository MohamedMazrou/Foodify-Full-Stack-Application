import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {LottieComponent, AnimationOptions } from 'ngx-lottie';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-sidebar',
  standalone: true,
  imports: [LottieComponent ,RouterOutlet],
  templateUrl: './layout-sidebar.component.html',
  styleUrl: './layout-sidebar.component.css',
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutAuthComponent {

    options: AnimationOptions = {
    path: '../../../../assets/animations/Delivery Agriculture style.json',
  };


}
