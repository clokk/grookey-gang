import { Component, OnInit } from '@angular/core';
import { PokedexDataService } from '../pokedex-data.service';
import { SnackService } from '../../services/snack.service';


@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  dexURL = `grookeygang.com/directory/${this.data.authID}`;

  filterType: 'All' | 'Shiny' | 'Hidden Ability' | 'Rare Ball' ;
  

  constructor(public data: PokedexDataService, private snack: SnackService) {}

  ngOnInit() {
    this.data.caughtCount = 0;
    this.data.shinyCount = 0;
    this.data.hiddenAbilityCount = 0;
    this.data.rareBallCount = 0;
    this.data.getPokemon();
    this.setAll();
  }

  copySnack() {
    this.snack.customSnack('Pokedex URL has been copied!');
  }

  setAll() {
    console.log("set All");
    this.filterType = 'All';
  }

  setHA() {
    console.log("set HA");
    this.filterType = 'Hidden Ability';
  }

  setShiny() {
    console.log("set Shiny");
    this.filterType = 'Shiny';
  }

  setRare() {
    console.log("set Rare");
    this.filterType = 'Rare Ball';
  }
}