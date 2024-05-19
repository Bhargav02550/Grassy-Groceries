import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UploadService } from '../upload.service';
import { RouterLink, RouterModule } from '@angular/router';

interface Category {
  Name: string;
  Image: string;
}

@Component({
  selector: 'app-carousel-slider',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './carousel-slider.component.html',
  styleUrl: './carousel-slider.component.css',
})
export class CarouselSliderComponent {
  currentSlideIndex = 0;
  interval: any;
  bigslides = [
    'https://demos.codezeel.com/prestashop/PRS21/PRS210505/modules/cz_imageslider/views/img/sample-1.jpg',
    'https://demos.codezeel.com/prestashop/PRS21/PRS210505/modules/cz_imageslider/views/img/sample-2.jpg',
    'https://demos.codezeel.com/prestashop/PRS21/PRS210505/modules/cz_themeimages/views/img/parallax_img.jpg',
  ];
  smallslide_1 = '../assets/fruits.jpg';
  smallslide_2 = 'https://via.placeholder.com/350x180?text=Slide+2';
  ngOnInit() {
    this.startSlider();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  startSlider() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  stopSlider() {
    clearInterval(this.interval);
  }

  nextSlide() {
    // this.stopSlider();
    this.currentSlideIndex =
      (this.currentSlideIndex + 1) % this.bigslides.length;
  }

  prevSlide() {
    // this.stopSlider();
    this.currentSlideIndex =
      (this.currentSlideIndex - 1 + this.bigslides.length) %
      this.bigslides.length;
  }
  constructor(private uploadService: UploadService) {}
  items: any;

  categories: Category[] = [
    {
      Name: 'Vegetables',
      Image:
        'https://demos.codezeel.com/prestashop/PRS21/PRS210505/modules/cz_categoryimagelist/views/img/11-cz_categoryimagelist.jpg',
    },
    {
      Name: 'Fruits',
      Image:
        'https://demos.codezeel.com/prestashop/PRS21/PRS210505/modules/cz_categoryimagelist/views/img/12-cz_categoryimagelist.jpg',
    },
    {
      Name: 'Rice',
      Image:
        'https://img.freepik.com/premium-photo/raw-rice-sack-white-background_66899-1765.jpg',
    },
    {
      Name: 'Dry Fruits',
      Image:
        'https://demos.codezeel.com/prestashop/PRS21/PRS210505/modules/cz_categoryimagelist/views/img/13-cz_categoryimagelist.jpg',
    },
  ];
  selectitem(item: string) {
    this.uploadService.getItemsbycat(item).subscribe((data) => {
      this.items = data;
      console.log(data);
    });
    console.log(this.items);
  }
}
