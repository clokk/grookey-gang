import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokedexDataService } from '../../pokedex-data.service';

@Component({
  selector: 'app-pokedex-info-dialog',
  template: `
  <h1 mat-dialog-title>Pokemon Info Update</h1>
  <div mat-dialog-content>
  <section>
    <mat-checkbox
        color="primary"
        [(ngModel)]="data.caught">
      Caught
    </mat-checkbox>
  </section>
  <section>
    <mat-checkbox
        color="primary"
        [(ngModel)]="data.hiddenAbility">
      Hidden Ability ({{this.dataService.clickedMon.hiddenAbility}})
    </mat-checkbox>
  </section>
  <section>
    <mat-checkbox
        color="primary"
        [(ngModel)]="data.shiny">
      Shiny ✨
    </mat-checkbox>
  </section>
    <!-- <mat-form-field>
      <mat-label> Max IV Number </mat-label>
      <mat-select [(ngModel)]="data.individualValue">
        <mat-option value="0">0</mat-option>
        <mat-option value="1">1</mat-option>
        <mat-option value="2">2</mat-option>
        <mat-option value="3">3</mat-option>
        <mat-option value="4">4</mat-option>
        <mat-option value="5">5</mat-option>
        <mat-option value="6">6</mat-option>
      </mat-select>
    </mat-form-field> -->
    <div> 
      <br>
    </div>
    <section>
      Ball Type
      <br>
      <div>
        <mat-checkbox style="float: left;"
            color="primary"
            [(ngModel)]="data.pokeBall">
            <img src="/assets/Bag_Poke_Ball_Sprite.png"> Poké Ball
        </mat-checkbox>
        <mat-checkbox style="float: right; width: 50%;"
            color="primary"
            [(ngModel)]="data.premierBall">
            <img src="/assets/Bag_Premier_Ball_Sprite.png"> Premier Ball
        </mat-checkbox>
      </div>
      <div>
        <mat-checkbox style="float: left;"
            color="primary"
            [(ngModel)]="data.greatBall">
            <img src="/assets/Bag_Great_Ball_Sprite.png"> Great Ball
        </mat-checkbox>
        <mat-checkbox style="float: right; width: 50%;"
            color="primary"
            [(ngModel)]="data.ultraBall">
            <img src="/assets/Bag_Ultra_Ball_Sprite.png"> Ultra Ball
        </mat-checkbox>
      </div>
      <mat-checkbox style="float: left;"
          color="primary"
          [(ngModel)]="data.masterBall">
          <img src="/assets/Bag_Master_Ball_Sprite.png"> Master Ball
      </mat-checkbox>
      <mat-checkbox style="float: right; width: 50%;"
          color="primary"
          [(ngModel)]="data.diveBall">
          <img src="/assets/Bag_Dive_Ball_Sprite.png"> Dive Ball
      </mat-checkbox>
      <mat-checkbox style="float: left;"
          color="primary"
          [(ngModel)]="data.duskBall">
          <img src="/assets/Bag_Dusk_Ball_Sprite.png"> Dusk Ball
      </mat-checkbox>
      <mat-checkbox style="float: right; width: 50%;"
          color="primary"
          [(ngModel)]="data.healBall">
          <img src="/assets/Bag_Heal_Ball_Sprite.png"> Heal Ball
      </mat-checkbox>
      <mat-checkbox style="float: left;"
          color="primary"
          [(ngModel)]="data.luxuryBall">
          <img src="/assets/Bag_Luxury_Ball_Sprite.png"> Luxury Ball
      </mat-checkbox>
      <mat-checkbox style="float: right; width: 50%;"
          color="primary"
          [(ngModel)]="data.nestBall">
          <img src="/assets/Bag_Nest_Ball_Sprite.png"> Nest Ball
      </mat-checkbox>
      <mat-checkbox style="float: left;"
          color="primary"
          [(ngModel)]="data.netBall">
          <img src="/assets/Bag_Net_Ball_Sprite.png"> Net Ball
      </mat-checkbox>
      <mat-checkbox style="float: right; width: 50%;"
          color="primary"
          [(ngModel)]="data.quickBall">
          <img src="/assets/Bag_Quick_Ball_Sprite.png"> Quick Ball
      </mat-checkbox>
      <mat-checkbox style="float: left;"
          color="primary"
          [(ngModel)]="data.repeatBall">
          <img src="/assets/Bag_Repeat_Ball_Sprite.png"> Repeat Ball
      </mat-checkbox>
      <mat-checkbox style="float: right; width: 50%;"
          color="primary"
          [(ngModel)]="data.timerBall">
          <img src="/assets/Bag_Timer_Ball_Sprite.png"> Timer Ball
      </mat-checkbox>
      <!-- start rare balls -->
      <div>
        <mat-checkbox style="float: left;"
            color="primary"
            [(ngModel)]="data.beastBall">
            <img src="/assets/Bag_Beast_Ball_Sprite.png"> Beast Ball
        </mat-checkbox>
      </div>
      <mat-checkbox style="float: right; width: 50%;"
          color="primary"
          [(ngModel)]="data.fastBall">
          <img src="/assets/Bag_Fast_Ball_Sprite.png"> Fast Ball
      </mat-checkbox>
      <mat-checkbox style="float: left;"
          color="primary"
          [(ngModel)]="data.friendBall">
          <img src="/assets/Bag_Friend_Ball_Sprite.png"> Friend Ball
      </mat-checkbox>
      <mat-checkbox style="float: right; width: 50%;"
          color="primary"
          [(ngModel)]="data.heavyBall">
          <img src="/assets/Bag_Heavy_Ball_Sprite.png"> Heavy Ball
      </mat-checkbox>
      <mat-checkbox style="float: left;"
          color="primary"
          [(ngModel)]="data.levelBall">
          <img src="/assets/Bag_Level_Ball_Sprite.png"> Level Ball
      </mat-checkbox>
      <mat-checkbox style="float: right; width: 50%;"
          color="primary"
          [(ngModel)]="data.loveBall">
          <img src="/assets/Bag_Love_Ball_Sprite.png"> Love Ball
      </mat-checkbox>
      <mat-checkbox style="float: left;"
          color="primary"
          [(ngModel)]="data.lureBall">
          <img src="/assets/Bag_Lure_Ball_Sprite.png"> Lure Ball
      </mat-checkbox>
      <mat-checkbox style="float: right; width: 50%;"
          color="primary"
          [(ngModel)]="data.moonBall">
          <img src="/assets/Bag_Moon_Ball_Sprite.png"> Moon Ball
      </mat-checkbox>
      <mat-checkbox style="float: left;"
          color="primary"
          [(ngModel)]="data.dreamBall">
          <img src="/assets/Bag_Dream_Ball_Sprite.png"> Dream Ball
      </mat-checkbox>
    </section>
    <!-- <mat-form-field> -->
      <!-- <mat-label> Ball Type </mat-label> -->
      <!-- <mat-select [(ngModel)]="data.ballType"> -->
        <!-- <mat-option value="Poké Ball"><img src="/assets/Bag_Poke_Ball_Sprite.png"> Poké Ball</mat-option> -->
        <!-- <mat-option value="Premier Ball"><img src="/assets/Bag_Premier_Ball_Sprite.png"> Premier Ball</mat-option> -->
        <!-- <mat-option value="Great Ball"><img src="/assets/Bag_Great_Ball_Sprite.png"> Great Ball</mat-option> -->
        <!-- <mat-option value="Ultra Ball"><img src="/assets/Bag_Ultra_Ball_Sprite.png"> Ultra Ball</mat-option> -->
        <!-- <mat-option value="Master Ball"><img src="/assets/Bag_Master_Ball_Sprite.png"> Master Ball</mat-option> -->
        <!-- <mat-option value="Beast Ball"><img src="/assets/Bag_Beast_Ball_Sprite.png"> Beast Ball</mat-option> -->
        <!-- <mat-option value="Dive Ball"><img src="/assets/Bag_Dive_Ball_Sprite.png"> Dive Ball</mat-option> -->
        <!-- <mat-option value="Dusk Ball"><img src="/assets/Bag_Dusk_Ball_Sprite.png"> Dusk Ball</mat-option> -->
        <!-- <mat-option value="Fast Ball"><img src="/assets/Bag_Fast_Ball_Sprite.png"> Fast Ball</mat-option> -->
        <!-- <mat-option value="Friend Ball"><img src="/assets/Bag_Friend_Ball_Sprite.png"> Friend Ball</mat-option> -->
        <!-- <mat-option value="Heal Ball"><img src="/assets/Bag_Heal_Ball_Sprite.png"> Heal Ball</mat-option> -->
        <!-- <mat-option value="Heavy Ball"><img src="/assets/Bag_Heavy_Ball_Sprite.png"> Heavy Ball</mat-option> -->
        <!-- <mat-option value="Level Ball"><img src="/assets/Bag_Level_Ball_Sprite.png"> Level Ball</mat-option> -->
        <!-- <mat-option value="Love Ball"><img src="/assets/Bag_Love_Ball_Sprite.png"> Love Ball</mat-option> -->
        <!-- <mat-option value="Lure Ball"><img src="/assets/Bag_Lure_Ball_Sprite.png"> Lure Ball</mat-option> -->
        <!-- <mat-option value="Luxury Ball"><img src="/assets/Bag_Luxury_Ball_Sprite.png"> Luxury Ball</mat-option> -->
        <!-- <mat-option value="Moon Ball"><img src="/assets/Bag_Moon_Ball_Sprite.png"> Moon Ball</mat-option> -->
        <!-- <mat-option value="Nest Ball"><img src="/assets/Bag_Nest_Ball_Sprite.png"> Nest Ball</mat-option> -->
        <!-- <mat-option value="Net Ball"><img src="/assets/Bag_Net_Ball_Sprite.png"> Net Ball</mat-option> -->
        <!-- <mat-option value="Quick Ball"><img src="/assets/Bag_Quick_Ball_Sprite.png"> Quick Ball</mat-option> -->
        <!-- <mat-option value="Repeat Ball"><img src="/assets/Bag_Repeat_Ball_Sprite.png"> Repeat Ball</mat-option> -->
        <!-- <mat-option value="Timer Ball"><img src="/assets/Bag_Timer_Ball_Sprite.png"> Timer Ball</mat-option> -->
        <!-- <mat-option value="Dream Ball"><img src="/assets/Bag_Dream_Ball_Sprite.png"> Dream Ball</mat-option> -->
      <!-- </mat-select> -->
    <!-- </mat-form-field> -->
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Cancel</button>
    <button mat-button [mat-dialog-close]="data" cdkFocusInitial>
      Submit
    </button>
  </div>
`,
  styles: [
    'mat-form-field { width: 100%; }',
    'ball-img { margin-top: 20px; }'
  ]
})
export class PokedexInfoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PokedexInfoDialogComponent>,
    public dataService: PokedexDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void { 
    this.dialogRef.close();
  }

}
