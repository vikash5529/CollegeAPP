import {PersistanceService} from '../services/persistance.service';
import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
@Injectable({providedIn: 'root'})
export class LoginRouteGuard implements CanActivate {
  constructor(private persister: PersistanceService, private route: Router) {}

  canActivate() {
    if (this.persister.isAllowed) {
      return true;
    } else {
     this.route.navigate(['login']);
    }
  }
}
