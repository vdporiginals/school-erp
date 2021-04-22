import { Component } from '@angular/core';
import { TabsService } from './tabs/tabs.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public tabs: TabsService) {}
}
