import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Posting } from '../dataCommunication/posting';

@Component({
  selector: 'app-show-post',
  template: `
    <div *ngIf="post">
      <button class="btn btn-default btn-sm" (click)="delete()">삭제</button>
      <button class="btn btn-default btn-sm" routerLink="/editor/{{post.id}}">수정</button>
      <h3>{{post.title}}</h3>
      <div class="text">
        {{post.text}}
      </div>
      <br/>
    </div>
  `,
  styles: ['.text { height: 600px; overflow-y: scroll; white-space: pre;}']
})
export class ShowPostComponent {
  @Input() post: Posting;
  @Output() deletePosting = new EventEmitter<Posting>();

  delete() {
    this.deletePosting.emit(this.post);
  }
}
