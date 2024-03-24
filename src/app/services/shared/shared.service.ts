import {Injectable} from '@angular/core';
import {LessonResponses} from "../../responses/lesson/lesson.responses";
import {Subject} from "rxjs";
import {QuestionTypeResponses} from "../../responses/question-type/question-type.responses";
import {QuestionResponses} from "../../responses/question/question.responses";
import {TestResponses} from 'src/app/responses/test/test.responses';
import {ResultTypeResponses} from "../../responses/result_type_id/result_type.responses";
import {SearchLessonResponses} from "../../responses/search-lesson/search-lesson.responses";
import {UserResponse} from '../../responses/user/user.responses';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  lessonsChanged = new Subject<LessonResponses[]>();
  lessonChanged = new Subject<LessonResponses>();
  testChanged = new Subject<TestResponses>();
  questionsOfTestChanged = new Subject<QuestionResponses[]>();
  isFetching: Subject<boolean> = new Subject<boolean>();
  userInfoChanged = new Subject<UserResponse>();

  constructor() {
  }

  private _test !: TestResponses;

  get test(): TestResponses {
    return this._test;
  }

  set test(value: TestResponses) {
    this._test = value;
  }

  private _lessonViewInfo!: LessonResponses;

  get lessonViewInfo(): LessonResponses {
    return this._lessonViewInfo;
  }

  set lessonViewInfo(value: LessonResponses) {
    this._lessonViewInfo = value;
  }

  private _questionsOfCreatingTest!: QuestionResponses[];

  get questionsOfCreatingTest(): QuestionResponses[] {
    return this._questionsOfCreatingTest.slice();
  }

  set questionsOfCreatingTest(value: QuestionResponses[]) {
    this._questionsOfCreatingTest = value;
    this.questionsOfTestChanged.next(this.questionsOfCreatingTest);
  }

  private _creatingTest!: TestResponses;

  get creatingTest(): TestResponses {
    return this._creatingTest;
  }

  set creatingTest(value: TestResponses) {
    this._creatingTest = value;
  }

  private _tempTestQuestions!: QuestionResponses[];

  get tempTestQuestions(): QuestionResponses[] {
    return this._tempTestQuestions;
  }

  set tempTestQuestions(value: QuestionResponses[]) {
    this._tempTestQuestions = value;
  }

  private _resultType!: ResultTypeResponses[];

  get resultType(): ResultTypeResponses[] {
    return this._resultType;
  }

  set resultType(value: ResultTypeResponses[]) {
    this._resultType = value;
  }

  private _lessonsSearch!: SearchLessonResponses[];

  get lessonsSearch(): SearchLessonResponses[] {
    return this._lessonsSearch;
  }

  set lessonsSearch(value: SearchLessonResponses[]) {
    this._lessonsSearch = value;
  }

  private _questionTypeResponses!: QuestionTypeResponses[];

  get questionTypeResponses(): QuestionTypeResponses[] {
    return this._questionTypeResponses;
  }

  set questionTypeResponses(value: QuestionTypeResponses[]) {
    this._questionTypeResponses = value;
  }

  private _allLessons!: LessonResponses[];

  get allLessons(): LessonResponses[] {
    return this._allLessons;
  }

  set allLessons(value: LessonResponses[]) {
    this._allLessons = value;
  }

  private _lessonsHome!: SearchLessonResponses[];

  get lessonsHome(): SearchLessonResponses[] {
    return this._lessonsHome;
  }

  set lessonsHome(value: SearchLessonResponses[]) {
    this._lessonsHome = value;
  }

  private _lesson!: LessonResponses;

  get lesson(): LessonResponses {
    return this._lesson;
  }

  set lesson(value: LessonResponses) {
    this._lesson = value;
  }

  private _lessonsByUser!: LessonResponses[];

  get lessonsByUser(): LessonResponses[] {
    return this._lessonsByUser;
  }

  set lessonsByUser(value: LessonResponses[]) {
    this._lessonsByUser = value;
  }

  private _allTest!: TestResponses[];

  get allTest(): TestResponses[] {
    return this._allTest;
  }

  set allTest(value: TestResponses[]) {
    this._allTest = value;
  }

  private _testsHome!: TestResponses[];

  get testsHome(): TestResponses[] {
    return this._testsHome;
  }

  set testsHome(value: TestResponses[]) {
    this._testsHome = value;
  }

  checkLogin() {
    let jsonData = localStorage.getItem('token');
    if (jsonData) {
      return JSON.parse(jsonData);
    } else {
      return false;
    }
  }

  getToken() {
    let token = localStorage.getItem('token');
    return token;
  }

  onAddQuestionsOfTest(questions: QuestionResponses[]) {
    if (this._questionsOfCreatingTest === undefined) {
      this.questionsOfCreatingTest = questions;
    } else {
      let fillterQuestions = questions.filter(
        response => {
          !this._questionsOfCreatingTest.includes(response);
        });
      this._questionsOfCreatingTest.push(...fillterQuestions);
      this.questionsOfTestChanged.next(this.questionsOfCreatingTest);
    }

  }

  onRemoveQuestionOfTest(index: number) {
    this._questionsOfCreatingTest.splice(index, 1);
    console.log(this._questionsOfCreatingTest);
    this.questionsOfTestChanged.next(this.questionsOfCreatingTest);
  }

  onUpdateLessonsSearch(newLessons: SearchLessonResponses[]) {
    this.lessonsSearch.push(...newLessons);
  }


}
