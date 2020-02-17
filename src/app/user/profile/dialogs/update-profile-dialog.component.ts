import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-profile-dialog',
  template: `
  <h1 mat-dialog-title>Update your Profile!</h1>
  <div mat-dialog-content>
    <mat-form-field>
      <input matInput type="number" placeholder="Nintendo Switch Friend Code" [(ngModel)]="data.friendCode" />
    </mat-form-field>
    <mat-form-field>
      <input matInput placeholder="OT In Game Name" [(ngModel)]="data.trainerID" />
    </mat-form-field>
    <mat-form-field>
      <input matInput placeholder="Discord Username" [(ngModel)]="data.discordName" />
    </mat-form-field>
    <mat-form-field>
      <mat-label> Game Title Version </mat-label>
      <mat-select [(ngModel)]="data.version">
      <mat-option value="Sword">Sword</mat-option>
      <mat-option value="Shield">Shield</mat-option>
      <mat-option value="Sword and Shield">Sword and Shield</mat-option>
      </mat-select>
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Cancel</button>
    <button mat-button [mat-dialog-close]="data" cdkFocusInitial>
      Submit
    </button>
  </div>
`,
  styles: [
    'mat-form-field { width: 100%; }'
  ]
})
export class UpdateProfileDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UpdateProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
  }

  onNoClick(): void { 
    this.dialogRef.close();
  }

}
