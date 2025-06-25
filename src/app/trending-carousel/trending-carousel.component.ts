import { Component, computed, inject } from '@angular/core';
import { MediaCardComponent } from '../media-card/media-card.component';
import { BookmarkService, Media } from '../bookmark.service';
@Component({
  selector: 'app-trending-carousel',
  standalone: true,
  imports: [MediaCardComponent],
  templateUrl: './trending-carousel.component.html',
  styleUrl: './trending-carousel.component.css',
})
export class TrendingCarouselComponent {
  bookmarkService = inject(BookmarkService);
  mediaList = this.bookmarkService.mediaList;
  trendingList = computed(() => {
    return this.mediaList().filter((media) => media.isTrending);
  });

  toggleBookmark(media: Media): void {
    this.bookmarkService.toggleBookmark(media);
  }
}
