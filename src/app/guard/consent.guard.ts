import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {BackendService} from '../services/backend.service';
import {ConsentComponent} from '../consent/consent.component';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {Consent} from '../domain/consent'

@Injectable()
export class ConsentGuard implements CanActivate {
  public consentGiven: boolean;
  public consent;

  constructor(private backendService: BackendService, private dialog: MatDialog) {
    this.consentGiven = true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const consentResponse = this.backendService.getConsentGiven();
    consentResponse.subscribe(response => {
      if(response) {
        this.consentGiven = true;
      }
      else {
        this.consentGiven = false;
        let dialogRef = this.dialog.open(ConsentComponent);
        dialogRef.afterClosed().subscribe(result => {
          if(result) {
            this.consentGiven = true;
            this.consent = {consentGiven: true} //create consentDO object to send
            this.backendService.editConsent(this.consent).subscribe(Response);
          }
        });
      }
    });

    return this.consentGiven;
  }

}
