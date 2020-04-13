import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { INewsItem, INews } from '../../interfaces/news.interface';
import { NewsService } from '../../services';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemComponent implements OnInit {

  @Input() newsItem: INewsItem;
  @Output() public removeNewsItem: EventEmitter<INewsItem> = new EventEmitter<INewsItem>();


  constructor(private newsService: NewsService) { }

  ngOnInit() {
  }

  public upVoteNewsItem(newsItem: INewsItem): void {
    newsItem.points++;
    this.newsService.upVoteNewsItem(newsItem);

  }

  public hideNewsItem(newsItem: INewsItem): void {
    this.newsService.hideNewsItem(newsItem);
    this.removeNewsItem.emit(newsItem);

  }

}
