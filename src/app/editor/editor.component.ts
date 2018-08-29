import { Component, OnInit } from '@angular/core';
import { Posting } from '../posting_model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostActions } from '../dataCommunication/actions';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @select() selectedPost$: Observable<Posting>;

  constructor(
    private route: ActivatedRoute,
    private actions: PostActions
  ) { }

  ngOnInit() {
    this.initVal();
  }

  initVal() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.actions.get(id);
  }

  updatePosting(form: NgForm) {
    const post = {
      id: +this.route.snapshot.paramMap.get('id'),
      title: form.value.title,
      text: form.value.text
    };
    this.actions.update(post);
  }

  addPosting(form: NgForm) {
    this.actions.add({
      title: form.value.title,
      text: form.value.text
    } as Posting);
  }

  editPosting(form: NgForm) {
    let id;
    this.selectedPost$.subscribe(post => id = post.id);
    if (id === undefined) {
      this.addPosting(form);
    } else {
      this.updatePosting(form);
    }
  }
}
