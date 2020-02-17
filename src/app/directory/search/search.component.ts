import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  form: FormGroup;
  loading = false;
  serverMessage: string;

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = this.fb.group({
      userId: ['', [Validators.minLength(6), Validators.required]],
    });
  }

  get userId() {
    return this.form.get('userId');
  }

  async onSubmit() {
    this.loading = true;

    const userId = this.userId.value;

    try {
      if (userId !== '') {
        console.log(userId);
        // await this.afAuth.auth.signInWithEmailAndPassword(email, password);
        // this.router.navigate(["/directory/{{userId}}"]);
        this.router.navigate([`${userId}`], { relativeTo: this.route });
      }
    } catch (err) {
      this.serverMessage = err;
    }

    this.loading = false;
  }

}
