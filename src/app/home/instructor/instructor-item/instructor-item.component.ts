import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'koun-instructor-item',
  templateUrl: './instructor-item.component.html',
  styleUrls: ['./instructor-item.component.scss'],
})
export class InstructorItemComponent implements OnInit {
  @Input() title: string;
  @Input() overview: string;
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
