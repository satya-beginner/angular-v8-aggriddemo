import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { AgGridModule } from "ag-grid-angular";
import { HttpClientModule } from "@angular/common/http";
import { DateRendererComponent } from "./date-renderer.component";
import { ButtonsRendererComponent } from "./buttons-renderer.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AgGridModule.withComponents([
      DateRendererComponent,
      ButtonsRendererComponent
    ])
  ],
  declarations: [AppComponent, DateRendererComponent, ButtonsRendererComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
