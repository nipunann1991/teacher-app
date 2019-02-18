import { Component, OnInit } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry'; 

declare var $ : any;
declare var require: any;

 ;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
 
  }

  ngAfterViewInit(){
    
    $('.new-tutors-list').slick({
      initialSlide: 0,
      infinite: true,
      adaptiveHeight: true,
      dots: true,    
      slidesToShow: 3
    });
  }

 

  public myOptions = {
	  transitionDuration: '0.4s',
	  gutter: 10, 
	};


  masonryItems = [
    { title: 'Maths' },
    { title: 'Science' },
    { title: 'Computing' },
    { title: 'Economics' },
    { title: 'item 5' },
    { title: 'item 6' }
  ];


  masonryItems1 = [
    { title: '#Ad 1' },
    { title: '#Ad 2' },
    { title: '#Ad 3' },
    { title: '#Ad 4' },
    { title: '#Ad 5' },
    { title: '#Ad 6' }
  ];

}
