import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'koun-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  @ViewChild('detailsContainer', { static: false })
  detailsContainer: ElementRef;

  instructorsArr: string[] = [
    `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
      Math.random() * 1000
    )}`,
    `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
      Math.random() * 1000
    )}`,
    `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
      Math.random() * 1000
    )}`,
    `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
      Math.random() * 1000
    )}`,
  ];

  list1 = [
    {
      image: `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
        Math.random() * 1000
      )}`,
    },
    {
      image: `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
        Math.random() * 1000
      )}`,
    },
    {
      image: `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
        Math.random() * 1000
      )}`,
    },
    {
      image: `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
        Math.random() * 1000
      )}`,
    },
    {
      image: `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
        Math.random() * 1000
      )}`,
    },
    {
      image: `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
        Math.random() * 1000
      )}`,
    },
  ];

  list2 = [
    {
      image: `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
        Math.random() * 1000
      )}`,
    },
    {
      image: `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
        Math.random() * 1000
      )}`,
    },
    {
      image: `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
        Math.random() * 1000
      )}`,
    },
  ];

  list5 = [
    {
      image: `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
        Math.random() * 1000
      )}`,
    },
    {
      image: `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
        Math.random() * 1000
      )}`,
    },
    {
      image: `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
        Math.random() * 1000
      )}`,
    },
    {
      image: `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
        Math.random() * 1000
      )}`,
    },
  ];

  list3 = [
    {
      image: `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
        Math.random() * 1000
      )}`,
    },
    {
      image: `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
        Math.random() * 1000
      )}`,
    },
  ];

  list4 = [
    {
      image: `https://source.unsplash.com/random/500x700?sig=${Math.ceil(
        Math.random() * 1000
      )}`,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  scrollToDetails() {
    document
      .querySelector('body, html')
      .scroll({
        top: this.detailsContainer.nativeElement.querySelector(
          '.details-container'
        ).offsetTop,
        left: 0,
        behavior: 'smooth',
      });
  }
}
