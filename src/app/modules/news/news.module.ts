import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NewsListingComponent } from './components/news-listing/news-listing.component';
import { NewsRoutingModule } from './news-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NewsService } from './services';
import { DateAgoPipe } from './pipe/date-ago.pipe';

@NgModule({
  declarations: [NewsListingComponent, DateAgoPipe],
  providers: [NewsService, DateAgoPipe, DatePipe],
  imports: [
    CommonModule,
    NewsRoutingModule,
    HttpClientModule
  ],
  exports: [DateAgoPipe]
})
export class NewsModule { }
