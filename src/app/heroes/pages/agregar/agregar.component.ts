import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';

import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img {
    width: 70%;
    border-radius: 5px;
  }`
  ]
})
export class AgregarComponent implements OnInit {


  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];


  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_image: ''
  }


  constructor( private heroesService: HeroesService, 
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

  this.activatedRoute.params
  .pipe(
    switchMap( ({id}) => this.heroesService.getHeroePorId( id ) )
  )
  .subscribe( heroe => this.heroe = heroe );

  }


  guardar(){
   // console.log(this.heroe);

   if( this.heroe.superhero.trim().length === 0 ){
     return;
   }

   //console.log(this.heroe.id);
  if( this.heroe.id ){
    //actualizar, editar
    this.heroesService.actualizarrHeroe( this.heroe )
      .subscribe( heroe => console.log('Actualizando: ', heroe) )
  }else{
    //crear nuevo registro
    this.heroesService.agregarHeroe( this.heroe )
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar',heroe.id]);
  });
 
}



  }

}
