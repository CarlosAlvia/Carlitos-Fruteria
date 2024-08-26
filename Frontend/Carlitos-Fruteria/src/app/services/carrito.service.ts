import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoKey = 'carrito';
  private bURL: string = 'http://localhost:8000/';
  private optionsJson: any = { withCredentials: true, responseType: 'json' }
  private optionsText: any = { withCredentials: true, responseType: 'text' }
  constructor(private http: HttpClient) { }

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
    }
  }

  vaciarCarrito(): void {
    localStorage.removeItem(this.carritoKey);
  }

  sobrescribirCarrito(nuevoCarrito: any[]): void {
    const carritoAct=nuevoCarrito.map((item) => ({"id":item.id, "cantidad":item.cantidad}))
    localStorage.setItem(this.carritoKey, JSON.stringify(carritoAct));
  }

  crearPedido(pedidoData: any) {
    return this.http.post(this.bURL + 'crear-pedido', pedidoData, this.optionsJson);
  }
}
