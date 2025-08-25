import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Media {
  title: string;
  thumbnail: Thumbnail;
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}

export interface Thumbnail {
  trending?: Trending;
  regular: Regular;
}

export interface Regular {
  small: string;
  medium: string;
  large: string;
}

export interface Trending {
  small: string;
  large: string;
}
@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private dataUrl = '/assets/data.json';
  private http = inject(HttpClient);
  public mediaList = signal<Media[]>([]);
  public bookmarkedList = computed<Media[]>(() => {
    return this.mediaList().filter((fullData) => fullData.isBookmarked);
  });

  private readonly storageKey = signal('bookmarkedMedia');

  // constructor() {
  //   this.loadFromLocalStorage();
  // }

  getAllMedia(): Observable<Media[]> {
    return this.http.get<Media[]>(this.dataUrl);
  }

  toggleBookmark(media: Media): void {
    const updatedList = this.mediaList().map((item) =>
      item.title === media.title
        ? { ...item, isBookmarked: !item.isBookmarked }
        : item
    );

    this.mediaList.set(updatedList);
    this.saveToLocalStorage();
  }

  public saveToLocalStorage() {
    try {
      const data = JSON.stringify(this.mediaList());
      localStorage.setItem(this.storageKey(), data);
    } catch (e) {
      console.error('Failed to save bookmarks to localStorage', e);
    }
  }

  public loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey());
      if (stored) {
        const parsed: Media[] = JSON.parse(stored);
        this.mediaList.set(parsed);
      } else {
        this.getAllMedia().subscribe((data) => this.mediaList.set(data));
      }
    } catch (e) {
      console.error('Failed to load bookmarks from localStorage', e);
      this.mediaList.set([]);
    }
  }
}
