import {Component, OnInit} from "@angular/core";
import {FilmsService} from "../../shared/services/films.service";
import {ActivatedRoute} from "@angular/router";
import {FilmFromList} from "../../../assets/types/films";
import {catchError, map, of} from "rxjs";

@Component({
  selector: 'kinostorm-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})

export class ListDetailComponent implements OnInit {
  bannerSrc: any;
  filmItem: any;
  price: number = 0;
  error: any;
  stars: number = 5;
  starsPositive: any;
  starsEmpty: any;
  filmCharacters: any;
  countVisibleItems = 6;

  constructor(private filmsService: FilmsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let randomNumber = Math.floor(Math.random() * (Math.floor(7) - Math.ceil(1) + 1) + Math.ceil(1));
    this.bannerSrc = '/assets/images/banner-' + randomNumber + '.jpeg';
    let id = this.route.snapshot.paramMap.get('id');
    this.price = Math.floor(Math.random() * (300 - 99) + 99);
    this.filmsService.getFilmFromList(id || '1').pipe(
      map((data: FilmFromList) => {
        this.filmItem = {
          title: data.title,
          episode_id: data.episode_id,
          opening_crawl: data.opening_crawl,
          release_date: data.release_date,
          characters: data.characters,
          country: 'USA',
          duration: (Math.random() * (4 - 1) + 1).toFixed(2).replace('.', ':'),
          rating: (Math.random() * (10 - 6) + 6).toFixed(1),
          watched: data.watched || false,
          genre: ['Фантастика', 'Боевик', 'Фэнтази', 'Приключения']
        }
        this.onLoaded(this.filmItem);
      }),
      catchError(e => this.handleError(e))
    ).subscribe()
  }

  private onLoaded(data: any) {
    let starsCount = Math.floor(data.rating / 2);
    this.starsPositive = Array(starsCount);
    this.starsEmpty = Array(this.stars - starsCount);
    this.getCharacters()
  }

  private handleError(e: any) {
    const message = e.message || e.error?.message;
    this.error = message;
    return of(null);
  }

  watched() {
    this.filmItem.watched = true;
  }

  getCharacters() {
    return this.filmsService.getCharactersFromFilm(this.filmItem.characters).subscribe(data => {
      this.filmCharacters = data;
    })
  }

  showMore() {
    this.countVisibleItems = this.filmCharacters.length
  }
}
