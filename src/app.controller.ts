import { Controller, Get, HttpException, NotFoundException, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller()
export class AppController {

  LISTA = [
    { id: 1, rut: '123', nombre: 'Jorge' },
    { id: 2, rut: '456', nombre: 'Ana' },
  ];

  constructor(private readonly appService: AppService) {}

  @Get('callback/:id')
  getUsuarioCallback(@Param('id') id: number,  @Res() res: Response) {
    /*
    setTimeout(() => {
      console.log(2);
      setTimeout(() => {
        console.log(3);
        setTimeout(() => {
          console.log(5);
          res.send(salida);
        }, 5000);
      }, 1000);
    }, 2000);
    */
    console.log(1);
    this.obtenerUsuarioCallback(id, (error, usuario) => {
      if (error) {
        res.status(404).send(error.message);
      } else {
        res.status(201).send(usuario);
      }
    });
    console.log(2);
  }

  obtenerUsuarioCallback(id: number, retornarUsuario) {
    const usuario = this.LISTA.find((usuario) => usuario.id == id);
    console.log('Usuario encontrado:', usuario);
    if (!usuario) {
      retornarUsuario(new Error('Usuario no encontrado'));
    } else {
      retornarUsuario(null, usuario);
    }
  }

  @Get('promise/:id/:id2')
  getUsuarioPromise(@Param('id') id: number, @Param('id2') id2: number,  @Res() res: Response) {
    const promesa = this.obtenerUsuarioPromesa(id);
    const promesa2 = this.obtenerUsuarioPromesa(id2);
    
    promesa.then((usuario) => {
      promesa2.then((usuario2) => {
        console.log("Promesa 2 resuelta")
        res.status(200).send({usuario1: usuario, usuario2: usuario2});
      }).catch((error) => {
        console.log("Promesa 2 rechazada")
        res.status(200).send({usuario1: usuario, mensaje2: error.message});
      });
    })
    .catch((error1) => {
      console.log("Promesa 1 rechazada")
      promesa2.then((usuario2) => {
        console.log("Promesa 2 resuelta")
        res.status(200).send({mensaje1: error1.message, usuario2});
      }).catch((error2) => {
        console.log("Promesa 2 rechazada")
        res.status(404).send({mensaje1: error1.message, mensaje2: error2.message});
      });
    });
    
  }

  @Get('promise-encadenada/:id/:id2')
  getUsuarioPromiseEncadenada(@Param('id') id: number, @Param('id2') id2: number,  @Res() res: Response) {
    const promesa = this.obtenerUsuarioPromesa(id);
    
    promesa.then((usuario) => {
      console.log("Promesa 1 resuelta")
      return this.obtenerUsuarioPromesa(id2);
    }).then(usuario2 => {
      console.log("Promesa 2 resuelta")
      res.status(200).send({ usuario2: usuario2});
    }).catch((error) => {
      console.log("Promesa 1 o 2 rechazada")
      res.status(404).send({mensaje: error.message});
    });
  }

  obtenerUsuarioPromesa(id: number) {
    console.log("Promesa iniciada: ", id);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usuario = this.LISTA.find((usuario) => usuario.id == id);
        console.log('Usuario:', usuario);
        if (!usuario) {
          reject(new Error('Usuario no encontrado'));
        } else {
          resolve(usuario);
        }
      }, 3000);
    })
  }

  @Get('async-then')
  async getUsuarioAsyncThen(@Res() res: Response) {
    const promesa = this.ejemplo();
    promesa.then((resultado) => {
      console.log("Promesa resuelta")
      res.status(200).send({resultado});
    }).catch((error) => {
      console.log("Promesa rechazada")
      res.status(404).send({mensaje: error.message});
    });
  }

  async ejemplo() : Promise<string> {
    return 'ok';
  }

  @Get('async-await/:id/:id2/:id3')
  getUsuarioAsyncAwait(@Param('id') id: number, @Param('id2') id2: number, @Param('id3') id3: number) {
    console.log(new Date().toISOString(), "Inicio de la ejecución");
    try {
      return this.appService.obtenerListaUsuarios(id, id2, id3);
    } catch (error) {
      throw new HttpException(error.message, 404);
      // throw new NotFoundException(error.message);
    }
  }






}
