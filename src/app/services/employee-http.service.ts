import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../services/employee.service';
import { Observable, throwError } from 'rxjs';
import { NotifyMessageService } from './notify-message.service';
import { catchError } from 'rxjs/operators';

interface ListHttpParams {
  search;
  sort: {column, sort};
  pagination: {
    page: number
    perPage: number
  };
}

@Injectable({
  providedIn: 'root'
})

export class EmployeeHttpService {

  constructor(private http: HttpClient, private notifyMessage: NotifyMessageService) { }
  // os tipos de retorno devem ser iguais neste método
  list({search, sort, pagination}: ListHttpParams): Observable<HttpResponse<Employee[]>> {
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

    return this.http.get<Employee[]>('http://localhost:3000/employees', {params, observe: 'response'})
      .pipe(catchError((responseError) => this.handleError(responseError)));
  }

  get(id: number): Observable<Employee> {
    return this.http.get<Employee>(`http://localhost:3000/employees/${id}`)
    .pipe(catchError((responseError) => this.handleError(responseError)));
  }

  create(data: Employee): Observable<Employee> {
    return this.http.post<Employee>('http://localhost:3000/employees', data)
    .pipe(catchError((responseError) => this.handleError(responseError)));
  }

  update(data: Employee): Observable<Employee> {
    return this.http.put<Employee>(`http://localhost:3000/employees/${data.id}`, data)
    .pipe(catchError((responseError) => this.handleError(responseError)));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/employees/${id}`)
    .pipe(catchError((responseError) => this.handleError(responseError)));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Erro (cliente): ${error.error.message}`;
    } else {
      // backend-side error
      errorMessage = `Erro (servidor): código - ${error.status}<br>, Mensagem: ${error.message}`;
    }
    this.notifyMessage.error('Não foi possível realizar a operação . . .', errorMessage);
    return throwError(error);
  }
 }
