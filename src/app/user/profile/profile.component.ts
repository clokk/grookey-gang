import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  FormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileDialogComponent } from './dialogs/update-profile-dialog.component';
import { SnackService } from '../../services/snack.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private fb: FormBuilder, public dialog: MatDialog, private snack: SnackService, private afs: AngularFirestore, public profileService: ProfileService) { }


  formattedFriend = '';
  
  dexURL = `grookeygang.com/directory/${this.afAuth.auth.currentUser.uid}`;
  ngOnInit() {
    this.profileService.getUserProfile();
  }

  async onLogout() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  formatFriendCode(input, format, sep) {
    var output = "";
    var idx = 0;
    for (var i = 0; i < format.length && idx < input.length; i++) {
        output += input.substr(idx, format[i]);
        if (idx + format[i] < input.length) output += sep;
        idx += format[i];
    }

    output += input.substr(idx);

    return output;
  }

  openUpdateProfileDialog(): void {
    const dialogRef = this.dialog.open(UpdateProfileDialogComponent, {
      width: '400px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        if (result.friendCode) {
          var friendCode = result.friendCode.toString();
          this.formattedFriend = this.formatFriendCode(friendCode, [4, 4, 4], "-");
          console.log(this.formattedFriend);
          if (friendCode.length !== 12) {
            this.snack.customSnack('Error: Nintendo Switch friend code must be 12 digits long!');
          } else {
            this.updateProfile(result);
            this.snack.customSnack('Profile Updated!');
            this.profileService.getUserProfile();
          }
        } else {
          this.updateProfile(result);
          this.snack.customSnack('Profile Updated!');
          this.profileService.getUserProfile();
        }
      }
    });
  }

  async updateProfile(result) {
    // const user = await this.afAuth.auth.currentUser;
    console.log(result.version);
    if (this.formattedFriend !== undefined && this.formattedFriend !== '') {
      var newfriendCodeRef = await this.afs.collection('profile').doc(this.afAuth.auth.currentUser.uid).set({
        'friendCode': this.formattedFriend,
      }, { merge: true });
    }
    if (result.trainerID !== undefined && result.trainerID !== '') {
      var newTrainerRef = await this.afs.collection('profile').doc(this.afAuth.auth.currentUser.uid).set({
        'trainerID': result.trainerID,
      }, { merge: true });
    }
    if (result.version !== undefined && result.version !== '') {
      var newVersionRef = await this.afs.collection('profile').doc(this.afAuth.auth.currentUser.uid).set({
        'version': result.version,
      }, { merge: true });
    }
    if (result.discordName !== undefined && result.discordName !== '') {
      var newdiscordRef = await this.afs.collection('profile').doc(this.afAuth.auth.currentUser.uid).set({
        'discordName': result.discordName,
      }, { merge: true });
    }
  }

  copySnack() {
    this.snack.customSnack('Pokedex URL has been copied!');
  }
}
