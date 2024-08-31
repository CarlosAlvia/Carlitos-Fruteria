import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  cedula: string = '';
  clave: string = '';
  infoUsuario: any = null;
  constructor(private router:Router,
              private usuarioService: UsuarioService
  ){}

  ngOnInit(): void {
    if(this.usuarioService.getInfoUsuario()){
      this.irACatalogo();
    }
  }
  onSubmit(): void {
    
    this.usuarioService.login({"cedula":this.cedula,"clave":this.clave}).subscribe((info:any)=>{
      if(info["success"]){
        this.irACatalogo();
      }else{
        alert("Cédula o clave incorrecta");
        this.cedula="";
        this.clave="";
      }
    })
  }

  isFormValid(): boolean {
    return this.cedula.length === 10 && this.clave.length > 0;
    
  }

  irACatalogo(){
    this.router.navigate(["/catalogo"]);
  }
}
