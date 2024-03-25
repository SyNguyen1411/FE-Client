import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { SharedService } from '../../shared/shared.service';
import { invoiceDTO } from 'src/app/DTOS/invoice/invoice.dto';

@Injectable({
  providedIn: 'root'
})


export class PaymentSuccessService {
  private apiPaymentSuccess = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_INVOICE;
  private apiCheckStatus = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_PAYMENT + environment.API_MOMO + '/payment-status';

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
  ) { }

  // create invoice
  //   "order_id": "AAAAAAAAAA",
  //   "trans_id": "TTTTTTTTTTT",
  //   "total": 700000,
  //   "status": "pending",
  //   "user_info_id": 1,
  //   "package_upgrade_id": "24be4f8d-077a-4d30-b834-364db6596533"
  createInvoice(invoice: invoiceDTO) {
    const token = this.sharedService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post(this.apiPaymentSuccess , invoice, {
      headers: headers,
    });
  }

  // check status
  checkStatus(orderId: string, requestId: string) {
    const token = this.sharedService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post(this.apiCheckStatus + `?requestId=${requestId}&orderId=${orderId}`, null, {
      headers: headers,
    });
  }
}
