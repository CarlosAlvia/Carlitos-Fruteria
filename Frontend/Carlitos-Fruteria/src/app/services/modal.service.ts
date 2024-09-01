import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalSubject = new Subject<{ title: string, message: string, action: () => void }>();
  modalState$ = this.modalSubject.asObservable();

  showModal(title: string, message: string): Promise<void> {
    return new Promise((resolve) => {
      this.modalSubject.next({
        title,
        message,
        action: resolve 
      });
    });
  }
}
