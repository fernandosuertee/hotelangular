import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="form-outline mb-4">
      <input
        [type]="type"
        [ngModel]="model"
        (ngModelChange)="onModelChange($event)"
        [id]="id"
        class="form-control"
        [placeholder]="placeholder"
        [attr.min]="min"
        [attr.max]="max"
        required
      />
      <label class="floating-label" [for]="id">{{ label }}</label>
    </div>
  `,
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() type = 'text';
  @Input() model: any;
  @Output() modelChange = new EventEmitter<any>();
  @Input() id = '';
  @Input() label = '';
  @Input() placeholder = ' ';
  @Input() min?: number; 
  @Input() max?: number; 

  onModelChange(value: any) {
    this.modelChange.emit(value);
  }
}
