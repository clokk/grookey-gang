import { Injectable} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Profile } from '../profile.model';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileDoc: AngularFirestoreDocument<Profile>;
  profile: Observable<Profile>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}
  /**
   * Get the user profile
   */
  async getUserProfile() {
    this.afAuth.authState.subscribe(
      auth => {
        if (auth) {
          console.log(auth.uid);
          this.profileDoc = this.afs.doc<Profile>(`profile/${auth.uid}`); 
          this.profile = this.profileDoc.valueChanges();
          localStorage.setItem("userId", auth.uid);
        } else {
          console.log('blah blah blah');
        }
      }
    );
  }
  update(profile: Profile) {
    this.profileDoc.update(profile);
  }

}