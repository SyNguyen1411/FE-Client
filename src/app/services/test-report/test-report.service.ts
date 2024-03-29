import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedService} from "../shared/shared.service";
import {environment} from "../../../environments/environments";
import {TestReportDTO} from "../../DTOS/test-report/test-report.dto";
import {map, tap} from "rxjs";
import {TestReportResponse} from "../../responses/test-report/test-report.responses";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class TestReportService {

  private apiCreateTestReport = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_TEST_REPORT;
  private apiGetOneTestReport = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_TEST_REPORT;
  private apiGetListReport = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_TEST_REPORT;
  private apiDeleteTestReport = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_TEST_REPORT;

  constructor(private http: HttpClient, private sharedService: SharedService, private router: Router) {
  }

  createTestReport(testReport: TestReportDTO) {
    return this.http.post<TestReportResponse>(this.apiCreateTestReport, testReport).pipe(
      map((res: any) => {
        return <TestReportResponse>res.data;
      }),
    );
  }

  deleteTestReport(id: string) {

  }

  getAllTestReportByUserID(id: string) {
    return this.http.get(this.apiGetListReport + "?createdBy=" + id);
  }

  getOneTestReport(id: string) {
    return this.http.get(this.apiGetOneTestReport + "/" + id).pipe(
      map((res: any) => {
        return <TestReportResponse>res.data;
      }), tap(
        res => {
          this.sharedService.testReport = res;
        }, error => {
          console.log(error.message);
          this.router.navigate(['404']);
        },
      ),
    );
  }


}
