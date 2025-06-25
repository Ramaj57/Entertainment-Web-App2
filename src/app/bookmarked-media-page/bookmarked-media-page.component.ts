import { Component, computed, inject, signal } from '@angular/core';
import { MediaCardComponent } from '../media-card/media-card.component';
import { BookmarkService, Media } from '../bookmark.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-bookmarked-media-page',
  standalone: true,
  imports: [MediaCardComponent, SearchBarComponent],
  templateUrl: './bookmarked-media-page.component.html',
  styleUrl: './bookmarked-media-page.component.css',
})
export class BookmarkedMediaPageComponent {
  bookmarkService = inject(BookmarkService);
  bookmarkedList = this.bookmarkService.bookmarkedList;
  filterText = signal('');
  tvSeriesBookmarked = computed(() => {
    return this.bookmarkedList().filter(
      (media) => media.category.toLowerCase() === 'tv series'
    );
  });

  movieBookmarked = computed(() => {
    return this.bookmarkedList().filter(
      (media) => media.category.toLowerCase() === 'movie'
    );
  });

  filteredBookmarkedMovies = computed(() => {
    const filter = this.filterText().toLowerCase();
    return this.movieBookmarked().filter((media) =>
      media.title.includes(filter)
    );
  });

  filteredBookmarkedTV = computed(() => {
    const filter = this.filterText().toLowerCase();
    return this.tvSeriesBookmarked().filter((media) =>
      media.title.includes(filter)
    );
  });

  toggleBookmark(media: Media): void {
    this.bookmarkService.toggleBookmark(media);
  }

  onFilterBookmarked(searchFilter: string) {
    this.filterText.set(searchFilter);
  }
}
