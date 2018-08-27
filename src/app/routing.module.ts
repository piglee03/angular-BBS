import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { EditorComponent } from './editor/editor.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'editor', component: EditorComponent },
  { path: 'editor/:id', component: EditorComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
