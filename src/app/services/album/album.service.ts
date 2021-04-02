import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Album } from 'src/app/models/album.model';
import { Photo } from 'src/app/models/photo.model';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private albumsApiUrl = 'https://jsonplaceholder.typicode.com/albums';
  private photosApiUrl = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private httpClient: HttpClient) {}

  fetchUserAlbums(userId: number | string): Observable<Array<Album>> {
    return this.httpClient
      .get<Array<Album>>(`${this.albumsApiUrl}?userId=${userId}`)
      .pipe(
        map((albums) => albums.map((album) => new Album().deserialize(album)))
      );
  }

  fetchAlbumPhotos(albumId: number | string): Observable<Array<Photo>> {
    return this.httpClient
      .get<Array<Photo>>(`${this.photosApiUrl}?albumId=${albumId}`)
      .pipe(
        map((photos) => photos.map((photo) => new Photo().deserialize(photo)))
      );
  }
}
