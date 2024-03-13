import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environments";
import {SharedService} from "../shared/shared.service";
import {QuestionDTO} from "../../DTOS/question/question.dto";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiGetListQuestion = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_QUESTION;
  private apiCreateListQuestion = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_QUESTION + environment.API_LIST;
  private apiDeleteQuestion = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_QUESTION;
  private apiUpdateQuestion = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_QUESTION;

  constructor(private sharedService: SharedService, private http: HttpClient) {
  }

  putListQuestion(listQuestion: QuestionDTO[]) {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post(this.apiCreateListQuestion, listQuestion, {
      headers,
    });
  }

  deleteQuestion(id: string) {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete(this.apiDeleteQuestion + '/' + id, {
      headers,
    });
  }

  updateQuestion(updateQuestion: QuestionDTO, questionId: string) {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.put(this.apiUpdateQuestion + '/' + questionId, updateQuestion, {
      headers,
    });
  }
}
