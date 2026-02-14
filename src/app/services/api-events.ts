import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RootEventConfig } from '../models/event';

@Injectable({
  providedIn: 'root',
})
export class ApiEvents {
  private http = inject(HttpClient);
  private baseUrl = 'https://br-fe-assignment.github.io';

  getEvents(): Observable<RootEventConfig> {
    return this.http.get<RootEventConfig>(`${this.baseUrl}/customer-events/events.json`);
  }
}
