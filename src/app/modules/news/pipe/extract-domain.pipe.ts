import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractDomain'
})
export class ExtractDomainPipe implements PipeTransform {

  transform(url: string, args?: any): any {
    if (url) {
      if (url.length > 3) {
        let result;
        let match = url.match(/^(?:https?:\/\/)?(?:www\.)?([^:\/\n?=]+)/im);
        if (match) {
          result = match[1];
          match = result.match(/^[^.]+\.(.+\..+)$/);
          if (match) {
            result = match[1];
          }
        }
        return result;
      }
      return url;
    }
    return url;
  }
}
