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
    console.log('selectedPost$: ', this.selectedPost$);
    this.getPostings();
  }
  getPostings(): void {
    this.actions.getAll(); // 매번 전부 가져오지 말고 변동이 있을 때에만 그때그때 받아오게 수정
  }

  selectPost(id: number) {
    this.actions.get(id);
  }

  deletePosting(post: Posting) {
    this.actions.delete(post.id);
    this.getPostings();
  }
}
