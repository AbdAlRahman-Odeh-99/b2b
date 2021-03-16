import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './chat.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ConversationComponent } from './conversation/conversation.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'contacts',
      },
      {
        path: 'contacts',
        component: ContactsComponent,
      },
      {
        path: 'conversations/:userId',
        component: ConversationComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
