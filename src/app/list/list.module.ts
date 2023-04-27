import { NgModule } from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {ListRoutingModule} from "./list.routing-module";
import {ListComponent} from "./list.component";
import {ListDetailComponent} from "./list-detail/list-detail.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ListRoutingModule
  ],
  declarations: [ListComponent, ListDetailComponent],
  exports: [ListComponent]
})

export class ListModule {

}
