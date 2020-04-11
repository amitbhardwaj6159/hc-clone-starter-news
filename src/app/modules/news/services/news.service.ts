import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { INewsItem } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient) { }

  public getNewsListing(query: any): Observable<any> {
    const url = `http://hn.algolia.com/api/v1/search?page=${query.page}`;
    return this.httpClient.get(url);

  }
  public upVote(newsItem: INewsItem): number {
    return newsItem.points++;


  }
}
