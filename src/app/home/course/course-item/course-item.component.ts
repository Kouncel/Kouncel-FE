import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { CategoryService } from 'src/app/models/categories.service';

@Component({
  selector: 'koun-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
  @Input() id: string;
  @Input() title: string = 'Category Title';
  @Input() description: string;
  @Input() image: string;

  constructor(public authenticationService: AuthenticationService,
    private categoryService: CategoryService) {}

  ngOnInit(): void {}

  edit(e: any) {
    e.preventDefault();
    alert('Edit');
  }
  delete(e: any) {
    e.preventDefault();
    this.categoryService.deleteCategory(this.id).subscribe(res => console.log(res));
    alert('Delete');
  }
}
