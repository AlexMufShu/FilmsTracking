import {Component, OnInit, Output, SimpleChanges} from '@angular/core';
import {FilmsService} from "../shared/services/films.service";
import {Films} from "../../assets/types/films";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {catchError, map} from "rxjs/operators";
import {of, Subscription} from "rxjs";

@Component({
  selector: 'kinostorm-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  list: Films[] = [];
  loading = false;
  tableLoadingSubscription: Subscription = new Subscription();
  displayedColumns: string[] = ['select', 'title', 'release_date', 'watched', 'rating'];
  dataSource: any;
  selection = new SelectionModel<Films>(true, []);
  settings: any;
  settingsList: any = ['Все фильмы', 'Просмотренные', 'Непросмотренные'];
  error: any;
  showDeleteButton = false;
  @Output() id: number | undefined;

  constructor(private filmsService: FilmsService) { }

  ngOnInit(): void {
    this.onBeforeLoading();
    this.tableLoadingSubscription.add(
      this.filmsService.getListOfFilms().pipe(
        map(data => this.onLoaded(data)),
        catchError(e => this.handleError(e)),
      ).subscribe()
    );
    this.settings = 'Все фильмы';
  }

  ngOnDestroy(): void {
    this.tableLoadingSubscription.unsubscribe();
  }

  private onBeforeLoading() {
    this.loading = true;
    this.tableLoadingSubscription.unsubscribe();
    this.tableLoadingSubscription = new Subscription();
  }

  private onLoaded(films: Films[]) {
    this.loading = false;
    this.list = films;
    this.setTableData(this.list)
  }

  private setTableData(list: any) {
     this.dataSource = new MatTableDataSource<Films>(list);
  }

  deleteSelected() {
    this.selection.selected.map(item => {
        this.list = this.list.filter((film: any) => film.title !== item.title)
        return this.dataSource.data = this.dataSource.data.filter((film: any) => film.title !== item.title)
    })
  }

  watched(item: Films) {
    let index = this.dataSource.data.indexOf(item);
    item.watched = true;
    this.dataSource.data[index] = item;
  }

  changeSettings(event: any) {
    if (event.value === "Просмотренные") {
      this.dataSource.data = this.list.filter((item: Films) => item.watched)
    } else if (event.value === 'Непросмотренные') {
      this.dataSource.data = this.list.filter((item: Films) => !item.watched)
    } else {
      this.dataSource.data = this.list;
    }
  }

  private handleError(error: any) {
    const message = error.message || error.error?.message;
    this.error = message;
    return of(null);
  }

  deleteChanges($event: any) {
    this.showDeleteButton = true;
  }
}
