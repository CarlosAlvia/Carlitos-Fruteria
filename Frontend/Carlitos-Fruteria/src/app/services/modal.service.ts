import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalSubject = new Subject<{ title: string, message: string }>();
  modalState$ = this.modalSubject.asObservable();

  constructor() {}

  showModal(title: string, message: string): void {
    this.modalSubject.next({ title, message });
  }
}
