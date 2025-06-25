import { Component, inject, signal } from '@angular/core';
import { TrendingCarouselComponent } from '../trending-carousel/trending-carousel.component';
import { MediaCardComponent } from '../media-card/media-card.component';
import { BookmarkService, Media } from '../bookmark.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TrendingCarouselComponent, MediaCardComponent, SearchBarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  bookmarkService = inject(BookmarkService);
  mediaList = this.bookmarkService.mediaList;
  filteredHome = signal<Media[]>(this.mediaList());

  toggleBookmark(media: Media): void {
    this.bookmarkService.toggleBookmark(media);
  }

  onFilterhome(searchFilter: string) {
    const filterText = searchFilter.toLowerCase();
    filterText
      ? this.filteredHome.set(
          this.mediaList().filter((media) =>
            media.title.toLowerCase().includes(filterText)
          )
        )
      : this.filteredHome.set(this.mediaList());
  }
}
