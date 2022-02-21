import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'koun-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Output() closeModal: EventEmitter<any> = new EventEmitter();

  @HostListener('document:keydown', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (event.key === 'Escape') {
      this.fireCloseModal();
    }
  }

  constructor() {}

  ngOnInit(): void {}

  fireCloseModal() {
    this.closeModal.emit(true);
  }
}
