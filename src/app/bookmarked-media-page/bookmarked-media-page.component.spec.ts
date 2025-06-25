import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkedMediaPageComponent } from './bookmarked-media-page.component';

describe('BookmarkedMediaPageComponent', () => {
  let component: BookmarkedMediaPageComponent;
  let fixture: ComponentFixture<BookmarkedMediaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkedMediaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkedMediaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
