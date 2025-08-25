import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpPageComponent } from './signUp-page.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SignUpPageComponent', () => {
  let component: SignUpPageComponent;
  let fixture: ComponentFixture<SignUpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpPageComponent],
      providers: [provideHttpClient(withInterceptorsFromDi())]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
