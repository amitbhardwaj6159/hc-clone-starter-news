import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { INewsItem, INews } from '../interfaces/news.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private upVotedNewsItems = [];
  private hiddenNewsItems = new Set();

  constructor(private httpClient: HttpClient) {
    this.hiddenNewsItems = new Set(this.getHiddenNewsItems());
    this.upVotedNewsItems = this.getUpVotedNewsItems();
  }

  public getNewsListing(query: any): Observable<any> {
    const url = `http://hn.algolia.com/api/v1/search?page=${query.page}`;
    return this.httpClient.get(url);

  }

  public upVoteNewsItem(newsItem: INewsItem): void {
    let alreadyExist = false;
    for (let index = 0; index < this.upVotedNewsItems.length; index++) {
      if (this.upVotedNewsItems[index].objectID === newsItem.objectID) {
        this.upVotedNewsItems[index].points = newsItem.points;
        alreadyExist = true;
        break;
      }
    }
    if (!alreadyExist) {
      this.upVotedNewsItems.push(newsItem);
    }
    localStorage.setItem('upVotedNewsItems', JSON.stringify([...this.upVotedNewsItems]));
  }

  public hideNewsItem(newsItem: INewsItem): void {
    this.hiddenNewsItems.add(newsItem);
    localStorage.setItem('hiddenNewsItems', JSON.stringify([...this.hiddenNewsItems]));
  }

  public getUpVotedNewsItems(): INewsItem[] {
    return localStorage.getItem('upVotedNewsItems') ? JSON.parse(localStorage.getItem('upVotedNewsItems')) : [] ;
  }
  public getHiddenNewsItems(): INewsItem[] {
    return localStorage.getItem('hiddenNewsItems') ? JSON.parse(localStorage.getItem('hiddenNewsItems')) : [] ;
  }

  public isNewsHidden(newsItem: INewsItem): boolean {
    let isNewsHidden = false;
    if (this.hiddenNewsItems.size) {
      const hiddenItems = Array.from(this.hiddenNewsItems);
      for (let index = 0; index < hiddenItems.length; index++) {
        console.log(hiddenItems[index]);
        if (hiddenItems[index].objectID === newsItem.objectID) {
          isNewsHidden = true;
          break;
        }
      }
    }
    return isNewsHidden;
  }

  public getUpdatedNewsCountFromLocal(newsItem: INewsItem): number {
    let upVotedCount = newsItem.points;
    if (this.upVotedNewsItems.length) {
      const upVotedItems = this.upVotedNewsItems;
      for (let index = 0; index < upVotedItems.length; index++) {
        if (upVotedItems[index].objectID === newsItem.objectID) {
          upVotedCount = upVotedItems[index].points;
          break;
        }
      }
    }
    return upVotedCount;



  }
}
