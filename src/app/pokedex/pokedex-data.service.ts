import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PokedexDataService {

  pokedex;
  pokedexInfo = {};
  indiPokedex;
  clickedMon = {
    name : '',
    img : '',
    shiny : '',
    hiddenAbility : '',
    id : ''
  }
  caughtCount = 0;
  hiddenAbilityCount = 0;
  shinyCount = 0;
  rareBallCount = 0;

  authID = this.afAuth.auth.currentUser.uid;


  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  getPokemon() {
    let allPokemon = this.afs.collection("pokedex").get()
      .toPromise()
      .then(snapshot => {
        // snapshot.forEach(doc => {
        //   console.log(doc.id, '=>', doc.data());
        // });
        this.pokedex = snapshot.docs;
        this.getUserPokedexInfo();
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  getClickedMon(name, img, shiny, hiddenAbility, id) {
    this.clickedMon.name = name;
    this.clickedMon.img = img;
    this.clickedMon.shiny = shiny;
    this.clickedMon.hiddenAbility = hiddenAbility[hiddenAbility.length - 1];
    this.clickedMon.id = id;
    console.log(this.clickedMon.hiddenAbility);
  }

  async getUserPokedexInfo() {
    var indiID = this.clickedMon.id;
    this.afs.collection("pokedexInfo").doc(this.afAuth.auth.currentUser.uid).get()
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

  async getDetailPokedexInfo() {
    var indiID = this.clickedMon.id;
    this.afs.collection("pokedexInfo").doc(this.afAuth.auth.currentUser.uid).get()
    .toPromise()
    .then((doc) => {
      if (doc.exists) {
        if (this.clickedMon.id !== '') {
          console.log("Document data:", doc.data()[indiID]);
          this.indiPokedex = doc.data()[indiID];
        }
        this.pokedexInfo = doc.data();
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }
}