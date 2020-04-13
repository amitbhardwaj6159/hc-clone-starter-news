import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListingComponent } from './news-listing.component';
import { INewsItem } from '../../interfaces/news.interface';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewsService } from '../../services';
import { of } from 'rxjs';

@Component({
  selector: 'app-news-item',
  template: ''
})
export class MockNewsItemComponent {
  @Input() newsItem: INewsItem;
  @Output() public removeNewsItem: EventEmitter<INewsItem> = new EventEmitter<INewsItem>();
}

class MockNewsService {
  getNewsListing({ }) {
    return of(null);
  }
  isNewsHidden() {
    return false;
  }
  getUpdatedNewsCountFromLocal(points) {
    return points;
  }

}

const newsData = {
  nbPages: 8,
  hits: [
    {
      objectID: 12,
      title: 'abc',
      points: 5
    },
    {
      objectID: 13,
      title: 'abcdd',
      points: 6
    }
  ]
};

describe('NewsListingComponent', () => {
  let component: NewsListingComponent;
  let fixture: ComponentFixture<NewsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsListingComponent, MockNewsItemComponent],
      providers: [
        {
          provide: NewsService,
          useClass: MockNewsService

        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get news items and should not hide any item', () => {
    const newsService = TestBed.get(NewsService);
    spyOn(newsService, 'getNewsListing').and.returnValue(of(newsData));
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.showLoader).toBeFalsy('show loader');
    expect(component.query.nbPages).toBe(newsData.nbPages, 'nbpages');
    expect(component.newsItems.length).toBe(newsData.hits.length, 'newsItems');
  });

  it('Shuold get news items and should hide all items as they are hidden by user already and saved in local storage', () => {
    const newsService = TestBed.get(NewsService);
    spyOn(newsService, 'getNewsListing').and.returnValue(of(newsData));
    spyOn(newsService, 'isNewsHidden').and.returnValue(true);
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.newsItems.length).toBe(0, 'newsItems');
  });

  it('Shuold get news items and should override vote count by local storage', () => {
    const newsService = TestBed.get(NewsService);
    spyOn(newsService, 'getNewsListing').and.returnValue(of(newsData));
    spyOn(newsService, 'getUpdatedNewsCountFromLocal').and.returnValue(10);
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.newsItems.length).toBe(newsData.hits.length, 'newsItems');
    expect(component.newsItems[0].points).toBe(10);
    expect(component.newsItems[1].points).toBe(10);
  });


});
