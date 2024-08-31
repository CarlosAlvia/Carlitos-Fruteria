import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { CarritoService } from '../../services/carrito.service';
import { CommonModule } from '@angular/common'; 
import { CrearProductoComponent } from '../crear-producto/crear-producto.component';
import { HeaderComponent } from '../shared/header/header.component';
import { UsuarioService } from '../../services/usuario.service';


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
  mostrarModal: boolean = false;
  infoUsuario: any = null;
  
  constructor(private productosService:ProductosService,
              private carritoService:CarritoService,
              private usuarioService:UsuarioService,
              private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.infoUsuario = this.usuarioService.getInfoUsuario();
    this.productosService.requestProductos().subscribe((info:any)=>{
     this.productos = info;
     this.productosARenderizar=this.productos.filter(()=>(true));
    })
   }

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

  abrirModalCrearProducto(): void {
    this.mostrarModal = true;
  }

  cerrarModalCrearProducto(): void {
    this.mostrarModal = false;
  }

  agregarAlCarrito(producto:any){
    this.carritoService.agregarProducto(producto);
  }
  
  agregarProducto(producto: any): void {
    producto.precioKilo=parseFloat(producto.precioKilo).toFixed(2);
    this.productosService.createProducto(producto).subscribe((result:any)=>{
      if(result["message"] ==="Producto creado con éxito."){
        this.productos.push(producto);
        this.productosARenderizar.push(producto);
        alert("Producto creado con éxito");
      }else{
        alert("Hubo un error al crear el producto.")
      }
    })
  }

}
