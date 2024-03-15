import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {SharedService} from "../../../../services/shared/shared.service";
import {SearchLessonResponses} from "../../../../responses/search-lesson/search-lesson.responses";
import {LessonResponses} from "../../../../responses/lesson/lesson.responses";
import {LessonService} from "../../../../services/lesson/lesson.service";
import {lastValueFrom, Observable, Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-question-test',
  templateUrl: './add-question-test.component.html',
  styleUrls: ['./add-question-test.component.css'],
})
export class AddQuestionTestComponent implements OnInit, OnDestroy {

  searchKey: string = '';
  lessons!: SearchLessonResponses[];
  lesson!: LessonResponses;
  totalResults!: number;
  isFetchingLesson: boolean = true;
  isFetchingQuestions: boolean = false;
  sourceForm!: FormGroup;
  isButtonClicked: boolean = false;
  lessonSub!: Subscription;
  fetchingSub!: Subscription;

  constructor(private offcanvasService: NgbOffcanvas, private sharedService: SharedService, private lessonService: LessonService) {
  }

  ngOnInit() {
    this.initForm();
    this.sharedService.lessonChanged.subscribe(lesson => {
      this.lesson = lesson;
      this.isFetchingQuestions = false;
    });
    this.sharedService.isFetching.subscribe(resp => {
      this.isFetchingQuestions = resp;
    });
  }

  ngOnDestroy() {

  }

  openOffcanvas(content: TemplateRef<any>) {
    this.offcanvasService.open(content, {backdrop: 'static', position: "end"});
  }

  async onSearch() {
    if (!this.isButtonClicked) {
      return;
    }
    let result$: Observable<SearchLessonResponses[]>;
    if (this.sourceForm.get('source')?.value === 'myLibrary') {
      const userInfo = JSON.parse(<string>localStorage.getItem('userInfo'));
      result$ = this.lessonService.searchLessonForTest(this.searchKey, 0, userInfo.id);
    } else {
      result$ = this.lessonService.searchLessonForTest(this.searchKey);
    }

    // Tạm thời viết như vậy
    await lastValueFrom(result$).then(result => {
      this.isFetchingLesson = false;
      return result;
    });
    this.lessons = this.sharedService.lessonsSearch;
  }

  onAddAllQuestions() {
    const questions = this.lesson.questions;
    this.sharedService.onAddQuestionsOfTest(questions);
    console.log(this.lesson);
  }

  private initForm() {
    this.sourceForm = new FormGroup({
      source: new FormControl("community"),
    });
  }
}
