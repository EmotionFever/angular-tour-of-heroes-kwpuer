import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';
import { PetService } from '../pet.service';
import { Pet } from '../pet';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  pets: Pet[];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private petService: PetService
  ) {}

  ngOnInit(): void {
    //this.hero = { id: 0, name: '', pet: { id: -1, name: '' } };
    this.getHero();
    this.getPets();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => {this.hero = hero;
                          if(this.hero.pet == null) {
                            this.hero.pet = { id: -1, name: '' };
                          }
                            });

  }

  getPets(): void {
    this.pets = this.petService.getPets();
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
   if(this.hero.pet != null) {
     console.log(this.hero.pet.id);
     this.hero.pet = this.petService.getPet(this.hero.pet.id);
     console.log(this.hero.pet.name);
   }
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}