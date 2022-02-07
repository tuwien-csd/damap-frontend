import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {BackendService} from '../services/backend.service';
import {ConsentComponent} from '../consent/consent.component';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

@Injectable()
export class ConsentGuard implements CanActivate {
  public consentGiven: boolean;

  constructor(private backendService: BackendService, private dialog: MatDialog) {
    const consentResponse = this.backendService.getConsentGiven();
    consentResponse.subscribe(response => {
      console.log('response');
      console.log(response);
      if(response) {
        this.consentGiven = true;
      }
      else {
        this.consentGiven = false;
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('can activate');
    console.log(this.consentGiven);
    if (!this.consentGiven) {
      // consent not given yet
      console.log('consent not yet given');
      let dialogRef = this.dialog.open(ConsentComponent);
    }
    else {
      // consent given, proceed navigation to routed component
      console.log('consent already given');
    }
    return this.consentGiven;
  }
}
