import { Routes } from '@angular/router';
import { VegetablesComponent } from './vegetables/vegetables.component';
import { AppComponent } from './app.component';
import { CarouselSliderComponent } from './carousel-slider/carousel-slider.component';
import { FruitsComponent } from './fruits/fruits.component';
import { AddpageComponent } from './addpage/addpage.component';

export const routes: Routes = [
  {
    path: '',
    component: CarouselSliderComponent,
  },
  {
    path: 'Vegetables',
    component: VegetablesComponent,
  },
  {
    path: 'Addproducts',
    component: AddpageComponent,
  },
  {
    path: 'Fruits',
    component: FruitsComponent,
  }
];
