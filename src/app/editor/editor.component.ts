import { Component, OnInit, Input } from '@angular/core';
import { DataCommService } from '../dataCommunication/data-comm.service';
import { Posting } from '../dataCommunication/posting';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  post: Posting = {
    id: null,
    title: '',
    text: ''
  };

  constructor(private dcService: DataCommService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initVal();
  }

  initVal() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id !== 0) {
      this.dcService.getPosting(id).subscribe(post => this.post = post);
    }
  }

  updatePosting(form: NgForm) {
    this.dcService.updatePosting({
      id: this.post.id,
      title: form.value.title,
      text: form.value.text
    }as Posting).subscribe((next) => {}, (err) => {}, () => this.router.navigate(['/list']));
  }

  addPosting(form: NgForm) {
    this.dcService.addPosting({
      title: form.value.title,
      text: form.value.text
    } as Posting).subscribe((next) => {}, (err) => {}, () => this.router.navigate(['/list']));
  }

  editPosting(form: NgForm) {
    if (this.post.id === null) {
      this.addPosting(form);
    } else {
      this.updatePosting(form);
    }
  }
}
