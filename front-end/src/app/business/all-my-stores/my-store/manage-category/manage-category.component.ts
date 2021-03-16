import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyStoresService } from '@app/business/all-my-stores/services/my-stores.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@app/shared/toaster/toast.service';
import { Subscription } from 'rxjs';
import { Category } from '@app/core/model/category';

@Component({
  selector: 'app-create-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})

export class ManageCategoryComponent implements OnInit, OnDestroy {
  categoryFromGroup: FormGroup;
  categoryFromGroupForUpdate: FormGroup;
  disableButtonUpdate: boolean = true;
  disableButtonSave: boolean = true;
  storeId: string;
  categories: Category [] = [];
  categoryIdSelectedForUpdate: string;
  categoryIdForRemoving: string;
  customPopoverOptions: any = {
    header: 'Select Category',
  };
  isFetchingCategories: boolean = false;
  listenOnErrorLoading: Subscription;

  constructor(
    private myStoresService: MyStoresService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.categoryFromGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required])
    });

    this.listenOnValidateButtonSave();
    this.getStoreId();
    this.categories = [];
    this.listenOnErrorLoading =  this.myStoresService.listenOnErrorLoading().subscribe(res => {
      this.categories = [];
    })
  }

  ngOnInit(): void {
  }

  getStoreId() {
    this.activatedRoute.params.subscribe(params => {
      this.storeId = params.id;
      this.getCategroies();
    });
  }

  listenOnValidateButtonSave() {
    this.categoryFromGroup.valueChanges.subscribe(() => {
      if (this.categoryFromGroup.valid) {
        this.disableButtonSave = false;
      } else {
        this.disableButtonSave = true;
      }
    });
  }

  createCategory() {
    this.myStoresService.createCategory(this.storeId, this.categoryFromGroup.value).subscribe((res) => {
      this.getCategroies();
      this.toastService.presentToastWithOptions('success', 'Category created successfully', 'success');
    });
  }

  UpdateCategory() {
    this.myStoresService.updateCategory(this.storeId, this.categoryIdSelectedForUpdate, this.categoryFromGroupForUpdate.value).subscribe((res) => {
      this.toastService.presentToastWithOptions('success', 'Category updated successfully', 'success');
    });
  }

  getCategroies() {
    this.isFetchingCategories = true;
    this.myStoresService.getCategories(this.storeId).subscribe(res => {
      this.isFetchingCategories = false;
      //this.categories = res.categories;
      this.setCategories(res.categories);
    });
  }

  setCategories(categories: Category[]) {
    this.categories = categories;
  }
  
  updateCategoryInfo(categoryId) {
    this.myStoresService.getCategory(this.storeId, categoryId.detail.value).subscribe(res => {
      this.categoryIdSelectedForUpdate = res._id;
      this.categoryFromGroupForUpdate = new FormGroup({
        name: new FormControl(res.name, [Validators.required]),
        tags: new FormControl((res.tags || []).join(', ') || '', [Validators.required])
      });
    });
  }
  
  updateCategoryIdForRemoving(categoryId) {
    this.categoryIdForRemoving = categoryId.detail.value;
  }

  removeCategory() {
    this.myStoresService.removeCategory(this.storeId, this.categoryIdForRemoving).subscribe(res => {
      this.getCategroies();
      this.categoryIdForRemoving = null;
      this.toastService.presentToastWithOptions('success', 'Category removed successfully', 'success');
    });
  }

  ngOnDestroy(): void {
    this.listenOnErrorLoading.unsubscribe();
  }
}
