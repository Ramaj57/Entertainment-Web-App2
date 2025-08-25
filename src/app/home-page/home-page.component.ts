import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
export class HomePageComponent implements OnInit{
  bookmarkService = inject(BookmarkService);
  mediaList = this.bookmarkService.mediaList;
  filterText = signal<string>('');
  filteredHome = computed(()=> this.mediaList().filter((media)=>
    media.title.toLowerCase().includes(this.filterText().toLowerCase())));

resultSize = computed(()=>this.filteredHome().length);
searchResults = signal('Found ' + this.resultSize() + ' results for "' + this.filterText() + '"');
    
  heading = signal<string>('');

  toggleBookmark(media: Media): void {
    this.bookmarkService.toggleBookmark(media);
  }

  onFilterhome(searchFilter: string) {
    this.filterText.set(searchFilter);
  }

  ngOnInit(): void {
this.bookmarkService.loadFromLocalStorage();
}
}
