import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvService} from "./env.service";
import {Observable} from 'rxjs';
import {Films, FilmFromList} from "../../../assets/types/films";
import {map} from "rxjs/operators";
import {forkJoin} from "rxjs";

@Injectable({providedIn: 'root'})

export class FilmsService {
  constructor(readonly http: HttpClient, private environment: EnvService) {
  }

  getListOfFilms(): Observable<Films[]> {
    return this.http.get<Films[]>(this.environment.apiUrl + 'films').pipe(
      map((data: any) => data.results.map((item: Films) => ({
        title: item.title,
        release_date: item.release_date,
        watched: item.watched || false,
        url: item.url,
        link: 'films/' + item.url.split('/')[5]
      })))
    )
  }

  getFilmFromList(url: string): Observable<FilmFromList> {
    return this.http.get<FilmFromList[]>(this.environment.apiUrl + 'films/' + url + '/?format=json').pipe(
      map((data: any) => data) || []
    )
  }


  getCharactersFromFilm(characters: []){
    let itemsCharacters = characters.map(item => {
      return this.http.get<any>(item).pipe(
        map((data: any) => data)
      )
    })
    return forkJoin(itemsCharacters)
  }
}
