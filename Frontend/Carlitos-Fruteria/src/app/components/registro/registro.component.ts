import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  cedula: string = '';
  clave: string = '';
  nombre: string = '';
  telefono: string = '';
  direccion: string = '';
  infoUsuario: any = null;
  constructor(private router:Router,
              private usuarioService: UsuarioService
  ){}

  ajustarTextArea(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Resetea la altura 
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta la altura al tamaño del contenido
  }


  validateNumberInput(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) { // Código ASCII para números de 0-9
      event.preventDefault();
    }
  }

  isFormValid(): boolean {
    return this.cedula.length === 10 && this.clave.length > 0 && this.nombre.length > 0 && this.telefono.length === 10 && this.direccion.length > 0;
  }

  onSubmit(): void {
    const data = {
      cedula: this.cedula,
      clave: this.clave,
      nombre: this.nombre,
      telefono: this.telefono,
      direccion: this.direccion
    };

    this.usuarioService.registro(data).subscribe((response: any) => {
      if (response.success) {
        alert("Usuario creado con éxito. Redirigiendo al login...");
        this.router.navigate(['/login']);
      }
    }, err => {
      if (err.status === 409) {
        alert("El usuario ya existe. Redirigiendo al login...");
        this.router.navigate(['/login']);
      } else {
        alert("Hubo un problema con el registro. Inténtalo de nuevo.");
      }
    });
  }
}

