import { Message } from '@app/core/model/chat';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';
import { ChatService } from '../service/chat.service';
import { AuthService } from '@app/core/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements OnInit, OnDestroy {
  message: string;
  conversationId; string;
  messages: Message[] = [];
  chatId: string;
  userInfo: any;
  listenOnErrorLoading: Subscription;
  @Input() conversationInfo: any;
  @Output('backToContacts') backToContacts: EventEmitter<any> = new EventEmitter();

  @ViewChild('content') content;

  constructor(
    private navCtrl: NavController,
    private chat: ChatService,
    private auth: AuthService,
  ) { }



  ngOnInit(): void {
    this.conversationId = this.conversationInfo._id;
    this.messages = [];
    this.getContact();
    this.userInfo = this.auth.userInfo();
    this.chat.initChat();
    this.listenOnErrorLoading = this.chat.listenOnErrorLoading().subscribe(res => {
      this.messages = [];
    })
  }


  getContact() {
    this.chat.getContact(this.conversationId).subscribe(res => {
      this.chatId = res.contactBetween;
      this.messages = [...res.messages];
      this.getLiveMessageFotUser();
    });
  }

  getLiveMessageFotUser() {
    this.chat.getLiveMessageFotUser(this.chatId).subscribe((message) => {
      this.messages.push(message)
    })
  }

  sendMessage() {
    const msg:Message = {
      text: this.message,
      date: new Date().toUTCString(),
      reply: false,
      user: {
        name: this.userInfo.username,
        receiver: this.userInfo._id,
        sender: this.userInfo._id
      },
    };
    this.messages.push(msg);
    this.chat.sendMessage(msg, this.chatId);
    this.message = '';
  }

  goBack() {
    this.backToContacts.emit();
  }

  scrollBottom() {
    this.content.scrollToBottom(500);
  }

  scrollToBottomOnInit() {
    this.scrollBottom();
  }

  ngOnDestroy(): void {
    this.message = '';
    this.conversationId = null;
    this.messages = [];
    this.chatId = null;
    this.userInfo = null;
    this.listenOnErrorLoading.unsubscribe();
  }
}
