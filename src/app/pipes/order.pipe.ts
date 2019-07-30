import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';

@Pipe({
  name: 'order',
  pure: false     // todo pipe é puro por padrao. Tem que tornar impuro para que ele possa reordenar a cada clique
})
export class OrderPipe implements PipeTransform {

  transform(colletction: any[], sortColumn: {column, sort}): any {
    if (!colletction) {
      return colletction;
    }

    return _.orderBy(colletction, [sortColumn.column], [sortColumn.sort]);
  }

}
