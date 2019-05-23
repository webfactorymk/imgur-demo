import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'ngd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router) {
  }

  ngOnInit() {
    console.log(environment);
  }

  authorize() {
    window.location.href = `https://api.imgur.com/oauth2/authorize?client_id=${environment.imgurClientId}&response_type=token`;
  }
}
