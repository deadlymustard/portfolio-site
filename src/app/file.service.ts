import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  getFileUrlLink(file: string): Observable<Object>  {
    const obj = this.http.get(`http://localhost:8080/api/${file}`);
    return obj as Observable<Object>;
  }




}
