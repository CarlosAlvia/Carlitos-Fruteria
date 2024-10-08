import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private bURL: string = 'http://localhost:8000/';
  private optionsJson: any = { withCredentials: true, responseType: 'json' }
  constructor(private http: HttpClient) { }

  requestProductos(){
    return this.http.get(this.bURL+'productos',this.optionsJson);
  }
  createProducto(data:any){
    return this.http.post(this.bURL+'crear-producto',data,this.optionsJson);
  }
  obtenerProductosEspecificos(ids:any){
    return this.http.get(this.bURL+'productos-especificos?ids='+ ids,this.optionsJson);
  }
}
