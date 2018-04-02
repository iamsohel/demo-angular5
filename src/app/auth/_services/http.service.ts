import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../../_config/app';

@Injectable()
export class HttpService {
  config: AppConfig;
  constructor(private http: HttpClient) {
    this.config = new AppConfig();
  }

  get(url: string, option?: any | null): Observable<any> {
    return this.http.get(this.config.apiEndPoint + url, option);
  }

  post(url: string, body: any | null, options?: any | null): Observable<any> {
    return this.http.post(this.config.apiEndPoint + url, body, options);
  }

  put(url: string, body: any | null, options?: any | null): Observable<any> {
    return this.http.put(this.config.apiEndPoint + url, body, options);
  }

  delete(url: string, options?: any | null): Observable<any> {
    return this.http.delete(this.config.apiEndPoint + url, options);
  }
}
