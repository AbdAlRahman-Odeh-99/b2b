import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '@app/business/admin/service/admin.service';
import { User } from '@app/core/model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit, OnDestroy {

  users: User[] = [];
  listenOnErrorLoading: Subscription;

  constructor(
    private adminService: AdminService
  ) {
    this.getUsers();
    this.users = [];
    this.listenOnErrorLoading = this.adminService.listenOnErrorLoading().subscribe(res => {
      this.users = [];
    })
  }

  ngOnInit(): void {
  }

  addToUsersList(user: User) {
    let role = user.role.split('O').join(' O');
    role = role.replace(role[0], role[0].toLocaleUpperCase());
    this.users.push({
      _id: user._id,
      username: user.username,
      email: user.email,
      role,
      phoneNumber: user.phoneNumber,
      fullName: user.fullName
    });
  }
  getUsers() {
    this.adminService.getUsers().subscribe((res) => {
      res.carOwners.forEach((user) => {
        //this.addToUsersList(user.user);
        this.pushToArrayPUsers(user.user);
      });
      res.garageOwners.forEach((user) => {
        //this.addToUsersList(user.user);
        this.pushToArrayPUsers(user.user);
      });
    });
  }

  pushToArrayPUsers(users : User[]){
    this.users.push(...users);
  }
  
  deleteUser(index: number) {
    const userId = this.users[index]._id;
    this.adminService.deleteUser(userId).subscribe((res) => {
      console.log(res)
    })
  }
  ngOnDestroy(): void {
    this.listenOnErrorLoading.unsubscribe();
  }
}
