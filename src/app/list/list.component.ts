import { Component, OnInit } from '@angular/core';
import { Posting } from '../posting_model';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { PostActions } from '../dataCommunication/actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @select() readonly postingList$: Observable<Posting[]>; // list data
  @select() readonly selectedPost$: Observable<Posting>; // 내용을 보여줄 post

  constructor(
    private actions: PostActions
  ) { }

  ngOnInit() {
    this.postingList$.subscribe(list => {
      if (list.length === 0) {
        this.actions.getAll();
      }
    }).unsubscribe();
  }

}
