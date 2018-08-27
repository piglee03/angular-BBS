import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { EditorComponent } from './editor/editor.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowPostComponent } from './list/show-post.component';
import { PostingEpics } from './dataCommunication/epic';
import { NgRedux } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from './dataCommunication/store';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';

const epicMiddleware = createEpicMiddleware();

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    EditorComponent,
    ShowPostComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PostingEpics],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<IAppState>,
    epics: PostingEpics
  ) {
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE,
      [createLogger(), epicMiddleware]
    );
    epicMiddleware.run(epics.rootEpic());
  }
}
