import { Component } from '@angular/core';
import { NewsServiceService } from 'src/app/service/news.service';
import * as moment from 'moment';
import { News } from 'src/app/model/news.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  modalVisibility: boolean = false;
  constructor(private service: NewsServiceService) {}
  articlsList: any = [];
  favList: any = [];
  param: string = 'A';

  ngOnInit() {
    this.getNews();
  }
  getNews() {
    this.service.getNews(this.param).subscribe((data: any) => {
      for (let item of data.articles) {
        item.publishedAt = moment(item.publishedAt).format(
          'dddd, MMMM Do YYYY, h:mm:ss a'
        );
        this.articlsList.push(item);
      }
    });
    return this.articlsList;
  }
  addToFavList(itemObj: any) {
    this.service.addFavItem(itemObj).subscribe((data: any) => {
      let newList = {
        itemId: data.itemId,
        author: data.author,
        content: data.content,
        description: data.description,
        publishedAt: data.publishedAt,
        title: data.title,
      };
      newList = itemObj;
      this.favList.push(itemObj);
      data.itemList = newList;
    });
  }
  addToFavList2() {
    this.service.getAllFavItem().subscribe((data: any) => {
      console.log(data, 'data');
    });
    console.log(this.favList);
  }
  openModal(): void {
    this.modalVisibility = true;
  }
}
