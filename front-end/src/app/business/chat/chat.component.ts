import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from './service/chat.service';
import { fromEvent, Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  contactSelected: any;
  isHids: boolean = true;
  isMobile: boolean = false;
  isMoblieAndOpenContact: boolean = true;
  isMoblieAndOpenConversation: boolean = true;
  resizeObservable$: Observable<Event>
  resizeSubscription$: Subscription;

  constructor(private chatService: ChatService) { }


  ngOnInit(): void {
    this.listenOnChangeSizeWindow();
  }


  selectedContact(value) {
    this.contactSelected = value;
    this.isHids = true;
    setTimeout(() => {
      this.isMoblieAndOpenContact = false;
      this.isMoblieAndOpenConversation = true;
      this.isHids = false;
    });
  }

  listenOnChangeSizeWindow() {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      if (window.innerWidth <= 720 && !this.isMobile) {
        this.isMobile = true;
      } else if (window.innerWidth > 720 && this.isMobile) {
        this.isMobile = false;
      }
    });
  }

  backToContacts() {
    if (this.isMobile) {
      this.isMoblieAndOpenContact = true;
      this.isMoblieAndOpenConversation = false;
    }
  }

  ngOnDestroy(): void {
    this.chatService.destroyChat();
  }
}
