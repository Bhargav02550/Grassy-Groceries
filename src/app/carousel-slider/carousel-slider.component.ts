import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carousel-slider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carousel-slider.component.html',
  styleUrl: './carousel-slider.component.css'
})
export class CarouselSliderComponent {
  currentSlideIndex = 0;
  slides = [
    'https://via.placeholder.com/600x400?text=Slide+1',
    'https://via.placeholder.com/600x400?text=Slide+2',
    'https://via.placeholder.com/600x400?text=Slide+3'
  ];

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }
}
