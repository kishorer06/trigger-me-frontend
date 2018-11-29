import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'emailSearchFilter'
})
export class FilterPipe implements PipeTransform {

    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter((it: any) => {
            return it.email.toLowerCase().includes(searchText);
        });
    }

}
