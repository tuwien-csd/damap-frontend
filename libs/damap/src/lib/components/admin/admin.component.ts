import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { AuthService } from '../../auth/auth.service';
import { InternalStorage } from '../../domain/internal-storage';

@Component({
  selector: 'damap-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  constructor(
    private backendService: BackendService,
    private authService: AuthService
  ) { }

  showOnlyActive = true;
  internalStorages: InternalStorage[] = [];

  ngOnInit(): void {

    if (!this.authService.isAdmin()) {
      //TODO: Redirect to home page
      return;
    }

    this.backendService.searchInternalStorage({}).subscribe(data => {
      this.internalStorages = data.items;
    });
  }

}
