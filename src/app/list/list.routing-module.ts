import { RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListComponent} from "./list.component";
import {ListDetailComponent} from "./list-detail/list-detail.component";

const rotes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      path: 'list',
    }
  },
  {
    path: ':id',
    component: ListDetailComponent,
    data: {
      path: 'films/:id',
    },
  },

]

@NgModule({
  imports: [RouterModule.forChild(rotes)],
  exports: [RouterModule]
})

export class ListRoutingModule {}
