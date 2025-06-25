import { NgStyle } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { BookmarkService, Media } from '../bookmark.service';

@Component({
  selector: 'app-media-card',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './media-card.component.html',
  styleUrl: './media-card.component.css',
})
export class MediaCardComponent {
  bookmarkService = inject(BookmarkService);
  mediaList = this.bookmarkService.mediaList;
  media = input<Media[]>();
  bookmarkToggled = output<void>();
  title = input<string>('');
  year = input<number>();
  category = input<string>('');
  categoryIconSrc = computed(() => {
    return this.category() === 'TV Series'
      ? 'assets/icon-category-tv.svg'
      : 'assets/icon-category-movie.svg';
  });
  categoryIconAlt = computed(() => {
    return 'picture of ' + this.category() + ' icon';
  });
  rating = input<string>('');
  isTrending = input<boolean>();
  isBookmarked = computed(
    () =>
      this.bookmarkService.mediaList().find((m) => m.title === this.title())
        ?.isBookmarked
  );
  smallTrendingBackgroundImage = input<string>('');
  largeTrendingBackgroundImage = input<string>('');
  smallRegularBackgroundImage = input<string>('');
  mediumRegularBackgroundImage = input<string>('');
  largeRegularBackgroundImage = input<string>('');

  toggleBookmarked(): void {
    this.bookmarkToggled.emit();
  }
}
