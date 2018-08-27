import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { DataCommService } from '../dataCommunication/data-comm.service';
import { Posting } from '../dataCommunication/posting';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { PostActions } from '../dataCommunication/actions';
import { IAppState } from '../dataCommunication/store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @select() readonly postingList$: Observable<Posting[]>; // list data
  selectedPost: Posting; // 내용을 보여줄 post

  constructor(
    // private dcService: DataCommService
    private ngRedux: NgRedux<IAppState>,
    private actions: PostActions
  ) { }

  ngOnInit() {
    this.getPostings();
  }

  getPostings(): void {
    this.actions.getAll();
    /*
    this.dcService.getAllPostings().subscribe(list => {
      if (this.postingList !== list) {
        this.postingList = list;
      }
    });
    */
  }

  selectPost(id: number) {
    /*
    this.dcService.getPosting(id).subscribe((post: Posting) => {
      if (this.selectedPost && this.selectedPost.id === post['id']) {
        this.selectedPost = null;
      } else {
        this.selectedPost = post;
      }
    });
    */
  }

  deletePosting(post: Posting) {
    /*
    this.postingList = this.postingList.filter(posting => post.id !== posting.id);
    this.dcService.deletePosting(+post.id).subscribe();
    this.selectedPost = null;
    */
  }
}

// redux함께 사용하기 + 함께 사용할 middleware 알아보기
