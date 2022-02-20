import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'koun-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent implements OnInit {
  @Input() title: string = 'Category Title';
  @Input()
  description: string = `A very long long long long long longlong long long longlong long long longlong long long longlong long long longlong long long longlong long long long Desc`;
  @Input() image: string;

  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  edit(e: any) {
    e.preventDefault();
    alert('Edit');
  }
  delete(e: any) {
    e.preventDefault();
    alert('Delete');
  }
}
