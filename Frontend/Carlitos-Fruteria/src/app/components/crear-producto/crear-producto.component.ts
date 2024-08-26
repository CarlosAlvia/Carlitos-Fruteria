import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.scss'
})
export class CrearProductoComponent {
  producto = {
    nombre: '',
    precioKilo: 0,
    urlimg: ''
  };

  @Output() productoCreado = new EventEmitter<any>();
  @Output() modalCerrado = new EventEmitter<void>();

  crearProducto(): void {
    this.productoCreado.emit(this.producto);
    this.cerrarModal();
  }

  cerrarModal(): void {
    this.modalCerrado.emit();
  }
}