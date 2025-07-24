import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
	constructor(public authService: AuthenticationService) {}

	logout() {
		this.authService.logout();
	}
}
