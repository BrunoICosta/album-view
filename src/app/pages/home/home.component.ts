import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from 'src/app/models/album.model';
import { User } from 'src/app/models/user.model';
import { AlbumService } from 'src/app/services/album/album.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userLogged: User | null = null;
  albums: Array<Album> = [];
  loading = true;

  constructor(
    private albumService: AlbumService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userLogged = this.authenticationService.getUser();

    if (this.userLogged) {
      this.albumService
        .fetchUserAlbums(this.userLogged.id)
        .subscribe((next) => {
          this.albums = next;
          this.loading = false;
        });
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
