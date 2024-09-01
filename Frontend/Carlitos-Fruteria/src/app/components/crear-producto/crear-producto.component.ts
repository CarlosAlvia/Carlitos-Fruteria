import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.scss'
})
export class CrearProductoComponent {
  producto = {
    nombre: '',
    precioKilo: 0.01,
    urlimg: ''
  };

  @Output() productoCreado = new EventEmitter<any>();
  @Output() modalCerrado = new EventEmitter<void>();

  constructor(private modalService: ModalService){};
  crearProducto(): void {
    if(this.producto.nombre.length && this.producto.urlimg.length){
      this.productoCreado.emit(this.producto);
      this.cerrarModal();
    }else{
      this.mostrarAlerta("Error","LLene todos los campos");
    }
  }

  cerrarModal(): void {
    this.modalCerrado.emit();
  }

  setTwoNumberDecimal(event:any) {
    const regexEstricta = /^\d+(\.\d{0,2})?$/;
    const regex = /\d+(\.\d{0,2})?/;
    const input = event.target as HTMLInputElement;
    const text = ""+input.value;
    if (!regexEstricta.test(text)) {
      const match = text.match(regex);
      let valuestr = '';
      if(match){
        valuestr =match[0];
      }
      let value = parseFloat(valuestr);
      input.value = value.toFixed(2);
      this.producto.precioKilo = value;
    }
    
  }

  async mostrarAlerta(tipo:string, mensaje:string){
    await this.modalService.showModal(tipo, mensaje);
  }
}