import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Album } from 'src/app/models/album.model';
import { Photo } from 'src/app/models/photo.model';
import { AlbumService } from 'src/app/services/album/album.service';

export interface DialogData {
  albumId: string;
  slides: Array<any>;
}

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  @Input() album: Album | null = null;

  albumPhotos: Array<Photo> = [];
  firstPhoto: Photo | null = null;

  constructor(private albumService: AlbumService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.album) {
      this.albumService.fetchAlbumPhotos(this.album?.id).subscribe((next) => {
        this.albumPhotos = next;
        this.firstPhoto = this.albumPhotos[0];
      });
    }
  }

  openPhotosDialog() {
    this.dialog.open(AlbumPhotosDialog, {
      panelClass: 'dialog-responsive',
      data: {
        albumId: this.album?.id,
        slides: this.albumPhotos,
      },
    });
  }
}

@Component({
  selector: 'app-album-photos-dialog',
  templateUrl: 'album-photos-dialog.component.html',
  styleUrls: ['./album-photos-dialog.component.scss'],
})
export class AlbumPhotosDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}
