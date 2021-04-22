import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../storage/localstorage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(private storage: LocalStorageService, private router: Router) {}

  ngOnInit() {}
  logout() {
    this.storage.clear();
    this.router.navigateByUrl('/login');
  }
}
