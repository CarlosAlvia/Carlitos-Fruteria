import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  infoUsuario:any = null;
  constructor(private router:Router,
              private usuarioService:UsuarioService
  ){}
  ngOnInit(): void {
    this.infoUsuario = this.usuarioService.getInfoUsuario();
    if(!this.infoUsuario){
      this.router.navigate(["/login"]);
    }
  }
  irACarrito(){
    this.router.navigate(["/carrito"]);
  }

  logout(): void {
    const cookieString = `user_info=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;`;
    document.cookie = cookieString;
    this.router.navigate(["/login"]);
  }
  
}
