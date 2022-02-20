import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { EllipsesPipe } from './pipes/ellipses.pipe';
import { SanitizeUrlPipe } from './pipes/sanitize-url.pipe';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ButtonComponent, EllipsesPipe, SanitizeUrlPipe],
  imports: [CommonModule],
  exports: [EllipsesPipe, SanitizeUrlPipe, TranslateModule],
})
export class SharedModule {}
