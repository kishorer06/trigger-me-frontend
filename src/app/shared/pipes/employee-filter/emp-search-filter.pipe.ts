import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'emailSearchFilter'
})
export class EmployeeSearchFilter implements PipeTransform {

    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter((it: any) => {
            if (it.email.toLowerCase().includes(searchText))
                return it.email.toLowerCase().includes(searchText);
            else if (it.empFName.toLowerCase().includes(searchText))
                return it.empFName.toLowerCase().includes(searchText);
            else if (it.empLName.toLowerCase().includes(searchText))
                return it.empLName.toLowerCase().includes(searchText);
            else if (it.empFName.toLowerCase().includes(searchText))
                return it.empFName.toLowerCase().includes(searchText);
            else if ((it.empFName.toLowerCase() + ' ' + it.empLName.toLowerCase()).includes(searchText))
                return it.empFName.toLowerCase() + ' ' + it.empLName.toLowerCase().includes(searchText);
        });
    }

}
