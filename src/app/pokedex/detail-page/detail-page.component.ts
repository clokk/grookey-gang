import { Component, OnInit } from '@angular/core';
import { PokedexDataService } from '../pokedex-data.service';
import { PokedexInfoDialogComponent } from './dialogs/pokedex-info-dialog.component';
import {
  FormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Location } from '@angular/common';
import { SnackService } from '../../services/snack.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public data: PokedexDataService, private fb: FormBuilder, public dialog: MatDialog, private afs: AngularFirestore, private location: Location, private snack: SnackService) { }

  ngOnInit() {
    this.data.caughtCount = 0;
    this.data.shinyCount = 0;
    this.data.hiddenAbilityCount = 0;
    this.data.rareBallCount = 0;
    this.data.getDetailPokedexInfo();
  }

  openPokedexInfoDialog(): void {
    const dialogRef = this.dialog.open(PokedexInfoDialogComponent, {
      width: '400px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.updatePokedexInfo(result);
      }
    });
  }

  async updatePokedexInfo(result) {
    // const user = await this.afAuth.auth.currentUser;
    console.log('updating pokemon info');
    console.log(result);
    var localClickedMonID = this.data.clickedMon.id.toString();

    var pokemonUpdate = {};
    pokemonUpdate[`${localClickedMonID}`] = {
      "caught" : result.caught ? result.caught : false,
      "hiddenAbility" : result.hiddenAbility ? result.hiddenAbility : false,
      "shiny" : result.shiny ? result.shiny : false,
      "individualValue" : result.individualValue ? result.individualValue : "0",
      "ballType" : result.ballType ? result.ballType : "Poké Ball"
    };
    if (result.caught) {
      var newContactRef = await this.afs.collection('pokedexInfo').doc(this.afAuth.auth.currentUser.uid).update(pokemonUpdate);
      await this.data.getUserPokedexInfo();
      this.snack.pokedexSnack('Pokedex updated!');
      this.location.back();
      this.data.caughtCount = 0;
      this.data.hiddenAbilityCount = 0;
      this.data.shinyCount = 0;
      this.data.rareBallCount = 0;
    } else {
      this.snack.pokedexSnack('Error: You can only submit if you have caught the pokemon!');
    }
  }

  backButton() {
    this.data.caughtCount = 0;
    this.data.shinyCount = 0;
    this.data.hiddenAbilityCount = 0;
    this.data.rareBallCount = 0;
    console.log('back');
    this.location.back();

  }

}
