import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-alert',
  imports: [CommonModule],
  templateUrl: './modal-alert.component.html',
  styleUrl: './modal-alert.component.css',
})
export class ModalAlertComponent {
  @Input() title = '';
  @Input() message = '';
  @Input() buttonText = 'OK';
  @Input() visible = false;

  @Output() confirm = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }
}
