import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../services/employee.service';
import { Observable, throwError } from 'rxjs';
import { NotifyMessageService } from './notify-message.service';
import { catchError, map, tap, take, first } from 'rxjs/operators';

interface ListHttpParams {
  search;
  sort: {column, sort};
  pagination: Pagination;
}

interface Pagination {
  page: number;
  perPage: number;
  total?: number;
}

@Injectable({
  providedIn: 'root'
})

export class EmployeeHttpService {

  constructor(private http: HttpClient, private notifyMessage: NotifyMessageService) {}

  urlApi = 'http://localhost:3000/employees';

  // os tipos de retorno devem ser iguais nestes métodos
  list({search, sort, pagination}: ListHttpParams): Observable< {data: Employee[], meta: Pagination} > {
    let filterObj = {
      _sort: sort.column,
      _order: sort.sort,
      _page: pagination.page + '',        // concatenação com 'vazio' transforma a variavel em string
      _limit: pagination.perPage + ''        // concatenação com 'vazio' transforma a variavel em string
    };

    if (search !== '') {
      filterObj = Object.assign({}, filterObj, {name: search});
    }
    const params = new HttpParams({
      fromObject: filterObj
    });

   // 'response' corresponde à requisição inteira (header, body)
    return this.http.get<Employee[]>(this.urlApi, {params, observe: 'response'})
      .pipe(
        tap(console.log),   // serve para debug. Facilita o uso de 'clg' e não interfere em nada na aplicação
        first(),
        // take(1),
        map(response => { // map serve para fazer uma transformação na chamada que será passada para os assinantes
          return {
            data: response.body,
            meta: {
              page: pagination.page,
              perPage: pagination.perPage,
              total: +response.headers.get('X-Total-Count')  // '+' serve para transformar um tipo qualquer em number
            }
          };
        }),
        tap(console.log),   // serve para debug. Facilita o uso de 'clg' e não interfere em nada na aplicação
        catchError((responseError) => this.handleError(responseError)));
  }

  get(id: number): Observable<any> {
    return this.http.get<Employee>(this.urlApi + '/' + id)
    .pipe(
      first(),    // first serve para matar o observable e impedir que ele fique ocupando meória, causando memory-leak
      catchError((responseError) => this.handleError(responseError)));
  }

  create(data: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.urlApi, data)
    .pipe(
      first(),    // usar este método sempre ao fazer requisições HTTP
      catchError((responseError) => this.handleError(responseError)));
  }

  update(data: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.urlApi + '/' + data.id, data)
    .pipe(
      first(),
      catchError((responseError) => this.handleError(responseError)));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.urlApi + '/' + id)
    .pipe(
      first(),
      catchError((responseError) => this.handleError(responseError)));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Erro (cliente): ${error.error.message}`;
    } else {
      // backend-side error
      switch (error.status) {
        case 404:
          errorMessage = 'Recurso não encontrado. Código do erro: 404';
          break;

        default:
          errorMessage = `Erro (servidor): código - ${error.status}<br>, Mensagem: ${error.message}`;
          break;
      }
    }
    this.notifyMessage.error('Não foi possível realizar a operação . . .', errorMessage);
    return throwError(error);
  }
 }
