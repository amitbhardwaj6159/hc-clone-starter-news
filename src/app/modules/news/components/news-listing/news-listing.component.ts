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

  news: INewsItem[] = [];
  query = { page: 1, nbPages: null};

  constructor(private newsService: NewsService) { }

  public ngOnInit(): void {
    this.getNewsListing();

  }

  private getNewsListing(): void {
    if (this.query.nbPages === null ||  this.query.nbPages >= this.query.page) {
      this.newsService.getNewsListing(this.query)
      .pipe(take(1))
      .subscribe((response: INews) => {
        this.query.nbPages = response.nbPages;
        response.hits.forEach(item => {
          this.news.push(item);
        });

      });
    }
  }

  public upVote(newsItem: INewsItem): void {
    newsItem.points = this.newsService.upVote(newsItem);
    // newsItem.points++;

  }
  public loadMore(): void {
    this.query.page++;
    this.getNewsListing();
  }

  public hideNews(newsItem: INewsItem): void {

  }

}
