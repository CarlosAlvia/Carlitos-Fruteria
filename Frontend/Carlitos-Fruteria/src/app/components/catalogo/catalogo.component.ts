import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { CommonModule } from '@angular/common'; 
import { CrearProductoComponent } from '../crear-producto/crear-producto.component';
import { HeaderComponent } from '../shared/header/header.component';
@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, CrearProductoComponent, HeaderComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent implements OnInit {
  productos : any = [];
  productosARenderizar : any = [];
  orden: string = "";
  user: string = "admin"
  mostrarModal: boolean = false;
  
  constructor(private productosService:ProductosService){}

  search(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.productosARenderizar = this.productos.filter((producto: any) => 
      producto.nombre.toLowerCase().startsWith(searchTerm)
    );
  }

  ordenarProductos(): void {
    if(this.orden=="asc"){
      this.productosARenderizar.sort((a: any, b: any) => b.nombre.localeCompare(a.nombre));
      this.orden="desc";
    }else{
      this.productosARenderizar.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
      this.orden="asc";
    }
  }

  ngOnInit(): void {
   this.productosService.requestProductos().subscribe((info:any)=>{
    this.productos = info;
    this.productosARenderizar=info;
    console.log(this.productos);
   })
  }
  
  abrirModalCrearProducto(): void {
    this.mostrarModal = true;
  }

  cerrarModalCrearProducto(): void {
    this.mostrarModal = false;
  }
  agregarProducto(producto: any): void {
    console.log(producto);
  }
}
