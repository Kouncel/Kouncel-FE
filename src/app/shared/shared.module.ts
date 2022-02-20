import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { EllipsesPipe } from './pipes/ellipses.pipe';

@NgModule({
  declarations: [ButtonComponent, EllipsesPipe],
  imports: [CommonModule],
  exports: [EllipsesPipe],
})
export class SharedModule {}
