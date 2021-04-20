// import { HttpClient } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { BehaviorSubject, Observable } from "rxjs";
// import { map } from "rxjs/operators";
// import { BaseApiService } from "src/app/shared/services/base.service";
// import { Message } from "../models/message.model";

// @Injectable({
//   providedIn: "root",
// })
// export class MessageService extends BaseApiService<Message> {
//   numOfTextArr = new BehaviorSubject<any[]>([]);
//   constructor(protected http: HttpClient) {
//     super(http, "api/Message");
//   }

//   getHistoryMes(id): Observable<Message[]> {
//     return this.http
//       .get("api/Message?Content=%00", {
//         params: {
//           SenderUserId: id,
//         },
//       })
//       .pipe(map((res: any) => res.Payload));
//   }
// }
