import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoKey = 'carrito';

  constructor() { }

  obtenerCarrito(): any[] {
    const carritoString = localStorage.getItem(this.carritoKey);
    return carritoString ? JSON.parse(carritoString) : [];
  }

  agregarProducto(producto: any): void {
    const carrito = this.obtenerCarrito();
    const productoExistente = carrito.find((p: any) => p.id === producto.id);
    if (productoExistente) {
      alert('El producto ya está en el carrito.');
    } else {
      carrito.push({"id":producto.id,"cantidad":1});
      console.log(JSON.stringify(carrito))
      localStorage.setItem(this.carritoKey, JSON.stringify(carrito));
      alert("Producto agregado al carrito");
    }
  }

}
