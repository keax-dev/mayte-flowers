import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactDialogService } from '@features/contact';
import { HomePageComponent } from '@features/home/pages/home-page/home-page.component';
import { AnalyticsService } from '@core/analytics/analytics.service';
import { provideRouter } from '@angular/router';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [
        provideRouter([]),
        {
          provide: AnalyticsService,
          useValue: {
            trackEvent: jasmine.createSpy('trackEvent'),
          },
        },
        {
          provide: ContactDialogService,
          useValue: {
            open: jasmine.createSpy('open'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('moves to the next and previous slide', () => {
    component.goTo(2);
    expect(component.activeIndex()).toBe(2);

    component.next();
    expect(component.activeIndex()).toBe(3);

    component.previous();
    expect(component.activeIndex()).toBe(2);
  });

  it('updates the current slide when navigating directly', () => {
    component.goTo(1);

    expect(component.currentSlide().title).toBe('HYMPERICU');
  });

  it('allows the user to pause and resume automatic rotation', () => {
    const initialState = component.isAutoRotating();

    component.toggleAutoRotation();
    expect(component.isAutoRotating()).toBe(!initialState);

    component.toggleAutoRotation();
    expect(component.isAutoRotating()).toBe(initialState);
  });
});
