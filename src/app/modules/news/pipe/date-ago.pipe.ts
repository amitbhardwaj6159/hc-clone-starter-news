import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({
    name: 'dateAgo',
    pure: true
})
export class DateAgoPipe implements PipeTransform {
    constructor(public datePipe: DatePipe) { }
    transform(value: string, args?: any): any {
        if (value) {
            const timeStamp = parseInt(value, 10);
            const seconds = Math.floor((+new Date() - +new Date(timeStamp * 1000)) / 1000);

            const intervals = {
                days: 259200,
                day: 86400,
                hour: 3600,
                minute: 60,
                second: 1
            };
            for (const index in intervals) {
                if (intervals.hasOwnProperty(index)) {
                    const counter = Math.floor(seconds / intervals[index]);
                    if (seconds <= 60) {
                        return '1 minute ago';
                    } else if (counter > 0 && seconds > 259200) {
                        return this.datePipe.transform(timeStamp * 1000, 'MM/dd/yyyy');
                    } else if (counter > 0) {
                        const title = index + (counter > 1 ? 's' : '');
                        return counter + ' ' + title + ' ago';
                    }
                }

            }
        }

    }
}
