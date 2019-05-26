import {Component} from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'ngd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  commenceAuthorization(): void {
    window.location.href = `${environment.imgurApiBase}/oauth2/authorize?client_id=${environment.imgurClientId}&response_type=token`;
  }
}
