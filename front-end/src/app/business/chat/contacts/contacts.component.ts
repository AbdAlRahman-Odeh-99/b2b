import { Contact } from './../../../core/model/contact';
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent implements OnInit, OnDestroy {
  listenOnErrorLoading: Subscription;
  contacts: Contact[] = [];
  // tslint:disable-next-line: no-output-rename
  @Output('selectedContacts') contactSelect: EventEmitter<any> = new EventEmitter();

  constructor(private chatService: ChatService) {
    this.contacts = [];
    this.getContacts();
    this.listenOnErrorLoading = this.chatService.listenOnErrorLoading().subscribe(res => {
      this.contacts = [];
    })
  }

  ngOnInit(): void {
  }

  getContacts() {
    this.chatService.getContacts().subscribe((res) => {
      //this.contacts = res.contacts;
      this.pushToArrayContacts( res.contacts.contacts);
    });
  }

  pushToArrayContacts(contacts : Contact[]){
    this.contacts = contacts;
  }

  openChat(index: number) {
    this.contactSelect.emit(this.contacts[index]);
  }
  ngOnDestroy(): void {
    this.listenOnErrorLoading.unsubscribe();
  }
}
