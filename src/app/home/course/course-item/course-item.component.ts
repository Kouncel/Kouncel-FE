import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() status: string = 'DRAFT';
  @Input() description: string;
  @Input() image: string;
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();

  constructor(public authenticationService: AuthenticationService,
    private categoryService: CategoryService) {}

  ngOnInit(): void {}

  editCourse(e: any) {
    e.preventDefault();
    this.edit.emit(this.id);
  }
  delete(e: any) {
    e.preventDefault();
    this.categoryService.deleteCategory(this.id).subscribe(res => console.log(res));
    alert('Delete');
  }
}
