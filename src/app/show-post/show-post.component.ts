import { Component, OnInit } from '@angular/core';
import { Posting } from '../posting_model';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { PostActions } from '../dataCommunication/actions';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {
  @select() readonly selectedPost$: Observable<Posting>; // 내용을 보여줄 post

  constructor(
    private actions: PostActions,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.actions.get(id);
  }
  deletePosting(post: Posting) {
    this.actions.delete(post.id);
  }
}
