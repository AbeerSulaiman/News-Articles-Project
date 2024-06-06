import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  UntypedFormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NewsServiceService } from '../../service/news.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.css'],
})
export class FavListComponent {
  constructor(private service: NewsServiceService) {}
  favList: any = [];

  ngOnInit() {
    this.getFavList();
  }

  getFavList() {
    this.service.getAllFavItem().subscribe((data: any) => {
      this.favList = data;
      console.log(this.favList);
    });
  }

  removeFavItem(favObj: any){  
    console.log(favObj);
      
      this.service.deleteItemById(favObj).subscribe((data: any) => {
        this.getFavList();
        if(this.favList.length > 0){
          this.favList.splice(data.index, 1);
        }
      })
  }
}
