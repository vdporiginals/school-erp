import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EvalueteService {

    constructor(private http: HttpClient) { }

    list = (pageNumber, pageSize) => {
        return this.http.get(`${environment.API_URL_EVALUETE}?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(map((result: any) => result.Payload));
    }

    create = (data) => {
        return this.http.post(`${environment.API_URL_EVALUETE}`, data).pipe(map((result: any) => result.Payload));
    }

    detail = (id) => {
        return this.http.get(`${environment.API_URL_EVALUETE}/${id}`).pipe(map((result: any) => result.Payload));
    }

    update = (id, data) => {
        return this.http.put(`${environment.API_URL_EVALUETE}?LeaveId=${id}`, data).pipe(map((result: any) => result.Payload));
    }
}
