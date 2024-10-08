import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements AfterViewInit{
  modalTitle: string = '';
  modalMessage: string = '';
  private action?: () => void;
  
  @ViewChild('sharedModal') sharedModal!: ElementRef;

  constructor(private modalService: ModalService) {}

  ngAfterViewInit(): void {
    this.modalService.modalState$.subscribe(({ title, message, action }) => {
      this.modalTitle = title;
      this.modalMessage = message;
      this.action = action;
      if (this.sharedModal) {
        const modalElement = new bootstrap.Modal(this.sharedModal.nativeElement);
        modalElement.show();
      } else {
        console.error('El modal no está disponible');
      }
    });
  }

  onOkClick(): void {
    if (this.action) {
      this.action(); 
    }
  }

}
