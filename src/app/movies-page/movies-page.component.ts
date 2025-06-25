import { Component, computed, inject, signal } from '@angular/core';
import { MediaCardComponent } from '../media-card/media-card.component';
import { BookmarkService, Media } from '../bookmark.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [MediaCardComponent, SearchBarComponent],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css',
})
export class MoviesPageComponent {
  bookmarkService = inject(BookmarkService);
  mediaList = this.bookmarkService.mediaList;
  movieList = computed(() =>
    this.mediaList().filter((media) => {
      return media.category.toLowerCase() === 'movie';
    })
  );
  filteredMovies = signal<Media[]>(this.movieList());

  toggleBookmark(media: Media): void {
    this.bookmarkService.toggleBookmark(media);
  }

  onFilterMovies(searchFilter: string) {
    const filterText = searchFilter.toLowerCase();
    return filterText
      ? this.filteredMovies.set(
          this.mediaList().filter((media) =>
            media.title.toLowerCase().includes(filterText)
          )
        )
      : this.filteredMovies.set(this.movieList());
  }
}
