import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services';
import { take } from 'rxjs/operators';
import { INews, INewsItem } from '../../interfaces/news.interface';

@Component({
  selector: 'app-news-listing',
  templateUrl: './news-listing.component.html',
  styleUrls: ['./news-listing.component.scss']
})
export class NewsListingComponent implements OnInit {

  newsItems: INewsItem[] = [];
  query = { page: 1, nbPages: null};
  showLoader = true;

  constructor(private newsService: NewsService) { }

  public ngOnInit(): void {
    this.getNewsListing();

  }

  private getNewsListing(): void {
    this.showLoader = true;
    if (this.query.nbPages === null ||  this.query.nbPages >= this.query.page) {
      this.newsService.getNewsListing(this.query)
      .pipe(take(1))
      .subscribe((response: INews) => {
        this.showLoader = false;
        this.query.nbPages = response.nbPages;
        this.initializeNewsStates(response.hits);

      }, () => { this.showLoader = false; });
    }
  }

  private initializeNewsStates(newsItems: INewsItem[]): void {
    newsItems.forEach(item => {
      if (!this.newsService.isNewsHidden(item)) {
          item.points = this.newsService.getUpdatedNewsCountFromLocal(item);
          this.newsItems.push(item);
      }
    });
    if (this.newsItems.length === 0) {
      this.loadMore();
    }

  }

  public upVoteNewsItem(newsItem: INewsItem): void {
    newsItem.points++;
    this.newsService.upVoteNewsItem(newsItem);

  }
  public loadMore(): void {
    this.query.page++;
    this.getNewsListing();
  }

  public hideNewsItem(newsItem: INewsItem): void {
    this.newsItems = this.newsItems.filter(item => item.objectID !== newsItem.objectID);
    this.newsService.hideNewsItem(newsItem);

  }

}
