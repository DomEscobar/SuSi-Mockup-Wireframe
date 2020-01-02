import { Pipe, PipeTransform } from '@angular/core';
import { CustomComponent } from '../+models/app';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform
{

  transform(components: CustomComponent[], searchStr: string): any
  {
    if (components == null)
    {
      return [];
    }

    return components.filter(o => o.name.toLowerCase().includes(searchStr.toLowerCase()));
  }

}
