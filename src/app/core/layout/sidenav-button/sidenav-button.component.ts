import { Component, Input } from '@angular/core';

@Component({
  selector: 'sidenav-button',
  templateUrl: './sidenav-button.component.html',
  styleUrls: ['./sidenav-button.component.sass'],
})
export class SidenavButtonComponent {
  @Input() itemLink!: string;
  @Input() iconName!: string;
  @Input() buttonLabel!: string;
}
