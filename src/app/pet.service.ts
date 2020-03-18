import { Injectable } from '@angular/core';
import { Pet } from './pet';
import { PETS } from './mock-pets';

@Injectable({
  providedIn: 'root',
})
export class PetService {

  constructor() { }

  getPets(): Pet[] {
    return PETS;
  }

  getPet(id: string): Pet{
    return PETS.find(pet => pet.id === id);
  }

}