import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { TvSeriesPageComponent } from './tv-series-page.component';

describe('TvSeriesPageComponent', () => {
  let component: TvSeriesPageComponent;
  let fixture: ComponentFixture<TvSeriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvSeriesPageComponent],
      providers: [provideHttpClient(withInterceptorsFromDi())]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvSeriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
