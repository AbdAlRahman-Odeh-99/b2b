import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { ToastService } from '@app/shared/toaster/toast.service';
import { Subscription } from 'rxjs';
import { User } from '@app/core/model/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {
  users: User [] = [];
  listenOnErrorLoading: Subscription;

  constructor(
    private adminService: AdminService,
    private toastService: ToastService
  ) { 
    this.getUsers();
    this.users = [];
    this.listenOnErrorLoading = this.adminService.listenOnErrorLoading().subscribe(res => {
      this.users = [];
    })
  }

  ngOnInit(): void {
  }

  addToUsersList(user: any) {
    this.users.push({
      _id: user._id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      fullName: user.fullName
    });
  }
  getUsers() {
    this.adminService.getWaitingUsers().subscribe((res) => {
      res.waitingUsers.forEach((user) => {
        this.addToUsersList(user.user);
      });
    });
  }

  acceptUser(index: number) {
    const userId = this.users[index]._id;
    this.adminService.acceptUser(userId).subscribe((res) => {
      this.toastService.presentToastWithOptions('success', 'User accepted successfully', 'success');
    })
  }
  rejectUser(index: number) {
    const userId = this.users[index]._id;
    this.adminService.rejectUser(userId).subscribe((res) => {
      this.toastService.presentToastWithOptions('success', 'User rejected successfully', 'success');
    })
  }
  ngOnDestroy(): void {
    this.listenOnErrorLoading.unsubscribe();
  }
}
