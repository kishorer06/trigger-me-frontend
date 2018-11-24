import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor() { }

    formatDate(_date) {
        var formattedDate = "";
        if (typeof _date.day === 'number' && _date.day >>> 0 === _date.day % 10)
            return formattedDate = JSON.stringify(_date.year) + "-" + JSON.stringify(_date.month) + "-0" + JSON.stringify(_date.day);
        else
            return formattedDate = JSON.stringify(_date.year) + "-" + JSON.stringify(_date.month) + "-" + JSON.stringify(_date.day);
    }

    formatDateToDatePicker(date: Date) {
        return this.parse(moment(date).format('YYYY-MM-DD'));
    }

    parse(value: any) {
        if (value) {
            const dateParts = value.trim().split('-');
            if (dateParts.length === 3 && dateParts[0] && dateParts[1] && dateParts[2]) {
                var ngbEmpDate = { 'year': toInteger(dateParts[0]), 'month': toInteger(dateParts[1]), 'day': toInteger(dateParts[2]) };
                return ngbEmpDate;
            }
            else {
                return null;
            }
        }
        return null;
    }

}
