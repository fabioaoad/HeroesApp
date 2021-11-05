import { Pipe, PipeTransform } from '@angular/core';

import { Heroe } from '../interfaces/heroes.interface';


//pure en false es para que se disparen todos los cambios del "ciclo de cambios de angular", por defecto es en true.
// consume muchos recursos y es por eso que se comento la linea
@Pipe({
  name: 'imagen',
  //pure: false
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {
    //console.log(heroe);

 // para verificar el uso del atriburo pure del pipe
 // console.log("se proceso la imagen");

    if( !heroe.id && !heroe.alt_image ){
      return 'assets/no-image.png'
    }
    else if ( heroe.alt_image ){
      return  heroe.alt_image;
    }
    else{
      return `assets/heroes/${ heroe.id }.jpg`;
    }

  }

}
