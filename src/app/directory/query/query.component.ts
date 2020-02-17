import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  pokedex;
  pokedexInfo = {};
  userInfo = {};
  indiPokedex;
  clickedMon = {
    name : '',
    img : '',
    shiny : '',
    id : ''
  }
  caughtCount = 0;
  hiddenAbilityCount = 0;
  shinyCount = 0;
  rareBallCount = 0;

  filterType: 'All' | 'Shiny' | 'Hidden Ability' | 'Rare Ball' ;

  constructor(private afs: AngularFirestore, private router: Router) { }

  ngOnInit() {
    this.caughtCount = 0;
    this.shinyCount = 0;
    this.hiddenAbilityCount = 0;
    this.rareBallCount = 0;
    this.getPokemon();
    this.getUserInfo();
    this.setAll();
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

  getQueryId() {
    var initRoute = this.router.url;
    var blah = initRoute.split("/");
    console.log(blah[2]);
    return blah[2];
  }

  getPokemon() {
    let allPokemon = this.afs.collection("pokedex").get()
      .toPromise()
      .then(snapshot => {
        this.pokedex = snapshot.docs;
        this.getUserPokedexInfo();
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  async getUserPokedexInfo() {
    var indiID = this.clickedMon.id;
    this.afs.collection("pokedexInfo").doc(this.getQueryId()).get()
    .toPromise()
    .then((doc) => {
      if (doc.exists) {
        if (this.clickedMon.id !== '') {
          console.log("Document data:", doc.data()[indiID]);
          this.indiPokedex = doc.data()[indiID];
        }
        this.pokedexInfo = doc.data();
        this.caughtCount = 0;
        this.shinyCount = 0;
        this.hiddenAbilityCount = 0;
        this.rareBallCount = 0;
        for (let poke of this.pokedex) {
          if (this.pokedexInfo[poke.id] !== undefined) {
            this.caughtCount += 1;
            if (this.pokedexInfo[poke.id].hiddenAbility) {
              this.hiddenAbilityCount += 1;
            }
            if (this.pokedexInfo[poke.id].shiny) {
              this.shinyCount += 1;
            }
            if (this.pokedexInfo[poke.id].ballType) {
              if (this.pokedexInfo[poke.id].ballType !== "Poké Ball" && this.pokedexInfo[poke.id].ballType !== "Great Ball" && this.pokedexInfo[poke.id].ballType !== "Ultra Ball" && this.pokedexInfo[poke.id].ballType !== "Premier Ball" && this.pokedexInfo[poke.id].ballType !== "Poké Ball" && this.pokedexInfo[poke.id].ballType !== "Dive Ball" && this.pokedexInfo[poke.id].ballType !== "Dusk Ball" && this.pokedexInfo[poke.id].ballType !== "Fast Ball" && this.pokedexInfo[poke.id].ballType !== "Heal Ball" && this.pokedexInfo[poke.id].ballType !== "Poké Ball" && this.pokedexInfo[poke.id].ballType !== "Nest Ball" && this.pokedexInfo[poke.id].ballType !== "Net Ball" && this.pokedexInfo[poke.id].ballType !== "Quick Ball" && this.pokedexInfo[poke.id].ballType !== "Repeat Ball" && this.pokedexInfo[poke.id].ballType !== "Timer Ball" && this.pokedexInfo[poke.id].ballType !== "Luxury Ball") {
                this.rareBallCount += 1;
              }
            }
          }
        }
        console.log(this.caughtCount);
        console.log(this.hiddenAbilityCount);
        console.log(this.shinyCount);
        console.log(this.rareBallCount);
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  async getUserInfo() {
    this.afs.collection("profile").doc(this.getQueryId()).get()
    .toPromise()
    .then((doc) => {
      if (doc.exists) {
        this.userInfo = doc.data();
        console.log(this.userInfo);
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

}
