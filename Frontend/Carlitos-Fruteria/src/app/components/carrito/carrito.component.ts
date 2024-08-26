import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { CommonModule } from '@angular/common'; 
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent implements OnInit{
  items:any[]=[];

  constructor(private carritoService:CarritoService,
    private productoService:ProductosService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.cargarIndicesCarrito()
  }

  cargarIndicesCarrito() {
    const carrito = this.carritoService.obtenerCarrito();
    const ids = carrito.map(item => item.id).join(',');
  
    this.productoService.obtenerProductosEspecificos(ids).subscribe((productos: any) => {
      this.items = productos.map((producto:any) => {
        const itemCarrito = carrito.find(item => item.id === producto.id);
        return {
          ...producto,
          cantidad: itemCarrito ? itemCarrito.cantidad : 1  
        };
      });
    }, error => {
      console.error('Error al obtener los productos:', error);
    });
  }

  sumarCantidad(index: number): void {
    this.items[index].cantidad++;
    this.actualizarCarrito();
  }

  restarCantidad(index: number): void {
    if (this.items[index].cantidad > 1) {
      this.items[index].cantidad--;
    }
    this.actualizarCarrito();
  }

  eliminarProducto(index: number): void {
    this.items.splice(index, 1);
    this.actualizarCarrito();
  }

  obtenerTotal(): number {
    return this.items.reduce((total, item) => total + item.precioKilo * item.cantidad, 0);
  }

  actualizarCarrito(){
    this.carritoService.sobrescribirCarrito(this.items);
  }

  irAlCatalogo(): void {
    this.router.navigate(['/catalogo']);
  }

  finalizarCompra(): void {
    const nombreUsuario = 'Sofia';
    const fecha = new Date().toISOString().split('T')[0]; 
    const productos = this.items.map(item => ({
      idProducto: item.id,
      cantidad: item.cantidad,
      subtotal: item.precioKilo * item.cantidad
    }));

    const pedidoData = {
      nombreUsuario,
      fecha,
      productos
    };

    if(this.items.length){
      this.carritoService.crearPedido(pedidoData).subscribe(
        response => {
          alert('Pedido creado con éxito.');
          this.carritoService.vaciarCarrito();
          this.items = []; 
        },
        error => {
          console.error('Error al crear el pedido:', error);
          alert('Hubo un error al crear el pedido. Por favor, inténtelo de nuevo.');
        }
      );
    }else{
      alert("No hay elementos en el carrito");
    }
    
  }

}
