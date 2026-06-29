import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AnalyticsService } from '@core/services/analytics.service';
import { ContactDialogService } from '@core/services/contact-dialog.service';
import { HomePageComponent } from '@features/home/pages/home-page/home-page.component';

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
            trackEvent: jasmine.createSpy('trackEvent')
          }
        },
        {
          provide: ContactDialogService,
          useValue: {
            open: jasmine.createSpy('open')
          }
        }
      ]
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
});
