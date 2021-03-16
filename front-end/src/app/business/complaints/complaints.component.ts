import { Component, OnInit, OnDestroy } from '@angular/core';
import { Complaint } from '@app/core/model/complaint';
import { Subscription } from 'rxjs';
import { ComplaintsService } from './service/complaints.service';
@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit, OnDestroy {
  complaints: Complaint[];
  isLoading: boolean = false;
  listenOnErrorLoading: Subscription;
  constructor(
    private complaintsService: ComplaintsService,
  ) {


  }

  ngOnInit(): void {
    this.complaints = [];
    this.getComplaints();
    this.listenOnErrorLoading = this.complaintsService.listenOnErrorLoading().subscribe(res => {
      this.complaints = [];
    })
  }

  getComplaints() {
    this.complaintsService.getComplaints().subscribe(res => {
      this.complaintsService.setSkip(this.complaintsService.skip + 5);
      res.complaints.forEach(complaint => {
        this.setComplaints(complaint);
      });
    });
  }

  setComplaints(complaint: Complaint){
    this.complaints.push({
      _id: complaint._id,
      garageOwnerName: complaint.garageOwnerId.fullName,
      storeName: complaint.garageId?.name || '',
      message: complaint.message.data,
    });
  }

  ngOnDestroy(): void {
    this.complaintsService.resetBothDataSkipAndLimit();
    this.listenOnErrorLoading.unsubscribe();
  }

}
