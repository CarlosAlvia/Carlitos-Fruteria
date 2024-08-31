import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private bURL: string = 'http://localhost:8000/';
  private optionsJson: any = { withCredentials: true, responseType: 'json' }
  constructor(private http: HttpClient) { }

  login(data:any){
    return this.http.post(this.bURL+"login",data,this.optionsJson);
  }

  getInfoUsuario(){
    const cookieValue = this.getCookie('user_info');
    if (cookieValue) {
      try {
        const decodedValue = decodeURIComponent(cookieValue);
        const decodedJSON = JSON.parse(decodedValue);
        return decodedJSON;
      } catch (e) {
        return null;
      }
    }
  }

  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
}
