import { Component, ViewChild } from '@angular/core';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass'],
})
export class SidenavComponent {
  showFiller = false;

  @ViewChild('drawer') drawer: any;

  toggleDrawer() {
    this.drawer.toggle();
  }
}
