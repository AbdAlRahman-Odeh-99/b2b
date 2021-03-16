import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusinessService } from '@app/business/services/business.service';
import { AuthService } from '@app/core/services/auth/auth.service';
import { Socket } from 'ngx-socket-io';
import { BasedUrlsConstants } from '@app/core/constants/routes';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private businessService: BusinessService,
    private socket: Socket,
    private authService: AuthService
  ) {

  }

  initChat() {
    this.socket.connect();

  }

  listenOnErrorLoading(): Observable<any> {
    return this.businessService.errorLoading.asObservable();
  }

  destroyChat() {
    this.socket.disconnect();
  }

  public sendMessage(message: any, chatbetweem) {
    this.socket.emit(chatbetweem, message);
  }

  public getLiveMessage = (contacts, user): Observable<any> => {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer) => {
      contacts.forEach(element => {
        let chatbetweem = '';
        if (user.id > element.id) {
          chatbetweem = user.id + '-' + element.id;
        } else {
          chatbetweem = element.id + '-' + user.id;
        }
        this.socket.on(chatbetweem, (message) => {
          observer.next(message);
        });
      });
    });
  }
  public getLiveMessageFotUser = (chatbetweem): Observable<any> => {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer) => {
        this.socket.on(chatbetweem, (message) => {
          observer.next(message);
        });
    });
  }

  getMessages(userId, contactID): Observable<any> {
    const path = `user/chat/${userId}/${contactID}`;
    return this.businessService.get(path, {
      headers: { authorization: this.authService.token },
    });
  }

  getContacts(): Observable<any> {
    const path = 'user/contacts';
    return this.businessService.get(path, {
      headers: { authorization: this.authService.token },
    });
  }

  getContact(contactId: string): Observable<any> {
    const path = `user/chat/${contactId}`;
    return this.businessService.get(path, {
      headers: { authorization: this.authService.token },
    });
  }

  conversationInfo(userId: string): Observable<any> {
    const path = `user-info/${userId}`;
    return this.businessService.get(path, {
      headers: { authorization: this.authService.token },
    });
  }

}
