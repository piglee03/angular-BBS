import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { DataCommService } from '../dataCommunication/data-comm.service';
import { Posting } from '../dataCommunication/posting';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  postingList: Posting[]; // list data
  selectedPost: Posting; // 내용을 보여줄 post

  constructor(
    private dcService: DataCommService
  ) { }

  ngOnInit() {
    this.getPostings();
  }

  getPostings(): void {
    this.dcService.getAllPostings().subscribe(list => {
      if (this.postingList !== list) {
        this.postingList = list;
      }
    });
  }

  selectPost(id: number) {
    this.dcService.getPosting(id).subscribe((post: Posting) => {
      if (this.selectedPost && this.selectedPost.id === post['id']) {
        this.selectedPost = null;
      } else {
        this.selectedPost = post;
      }
    });
  }

  deletePosting(post: Posting) {
    this.postingList = this.postingList.filter(posting => post.id !== posting.id);
    this.dcService.deletePosting(+post.id).subscribe();
    this.selectedPost = null;
  }
}

// redux함께 사용하기 + 함께 사용할 middleware 알아보기
