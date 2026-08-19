import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  LISTA = [
    { id: 1, rut: '123', nombre: 'Jorge' },
    { id: 2, rut: '456', nombre: 'Ana' },
  ];

  async obtenerListaUsuarios(id1, id2, id3): Promise<any[]> {
    const promise1 = this.obtenerUsuarioAsync(id1, 1);
    const promise2 = this.obtenerUsuarioAsync(id2, 3);
    const promise3 = this.obtenerUsuarioAsync(id3, 5);
    const usuario1 = await promise1;
    const usuario2 = await promise2;
    const usuario3 = await promise3;
    return [ usuario1, usuario2, usuario3 ];
  }

  async obtenerUsuarioAsync(id: number, segundos: number): Promise<any> {
    const usuario : any = this.LISTA.find((usuario) => usuario.id == id);
    await this.esperar(segundos);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return usuario;
  }

  esperar(segundos: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, segundos * 1000);
    });
  }

}
