import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { EllipsesPipe } from './pipes/ellipses.pipe';
import { SanitizeUrlPipe } from './pipes/sanitize-url.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    ButtonComponent,
    EllipsesPipe,
    SanitizeUrlPipe,
    ModalComponent,
  ],
  imports: [CommonModule],
  exports: [EllipsesPipe, SanitizeUrlPipe, TranslateModule, ModalComponent],
})
export class SharedModule {}
