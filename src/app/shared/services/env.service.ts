import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvService {

  public apiUrl: string = 'https://swapi.py4e.com/api/';
  constructor() {}
}
