import { Component, computed, inject, signal } from '@angular/core';
import { MediaCardComponent } from '../media-card/media-card.component';
import { BookmarkService, Media } from '../bookmark.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-tv-series-page',
  standalone: true,
  imports: [MediaCardComponent, SearchBarComponent],
  templateUrl: './tv-series-page.component.html',
  styleUrl: './tv-series-page.component.css',
})
export class TvSeriesPageComponent {
  bookmarkService = inject(BookmarkService);
  mediaList = this.bookmarkService.mediaList;
  tvSeriesList = computed(() =>
    this.mediaList().filter((media) => {
      return media.category.toLowerCase() === 'tv series';
    })
  );

  filteredTvSeries = signal<Media[]>(this.tvSeriesList());

  toggleBookmark(media: Media): void {
    this.bookmarkService.toggleBookmark(media);
  }

  onFilterTV(searchFilter: string) {
    const filterText = searchFilter.toLowerCase();
    filterText
      ? this.filteredTvSeries.set(
          this.mediaList().filter((media) =>
            media.title.toLowerCase().includes(filterText)
          )
        )
      : this.filteredTvSeries.set(this.tvSeriesList());
  }
}
