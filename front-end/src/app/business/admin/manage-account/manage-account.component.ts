import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  countWatingUser: number;
  constructor(
    private adminService: AdminService,
  ) {
    this.adminService.getWaitingUsers().subscribe(res => {
      this.countWatingUser = res.count === 0 ? null : res.count;
    });
  }

  ngOnInit(): void {
  }

}
