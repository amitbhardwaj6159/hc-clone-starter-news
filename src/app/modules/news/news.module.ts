import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NewsListingComponent } from './components/news-listing/news-listing.component';
import { NewsRoutingModule } from './news-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NewsService } from './services';
import { DateAgoPipe } from './pipe/date-ago.pipe';
import { ExtractDomainPipe } from './pipe/extract-domain.pipe';

@NgModule({
  declarations: [NewsListingComponent, DateAgoPipe, ExtractDomainPipe],
  providers: [NewsService, DateAgoPipe, DatePipe, ExtractDomainPipe],
  imports: [
    CommonModule,
    NewsRoutingModule,
    HttpClientModule
  ],
  exports: [DateAgoPipe, ExtractDomainPipe]
})
export class NewsModule { }
