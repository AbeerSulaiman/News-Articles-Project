import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Users } from '../model/users';

@Injectable({
  providedIn: 'root'
})
export class NewsServiceService {
  API_KEY: string = '668c430ab3da486e83659cd7fa74c269';
  url: string = 'http://newsapi.org/v2/everything?qInTitle=';
  params: string = '&inflation&from=YYYY-MM-DD&sortBy=relevancy&apiKey='
  baseApiUrl: any = environment.baseApiUrl;
  
  constructor(private http: HttpClient){ }

  GetRegisteredUser(){
    return this.http.get(this.baseApiUrl+'api/Users');
  }
  registerUser(userObj: Users) {
    return this.http.post(this.baseApiUrl+'api/Users/register', userObj);
  }
  loginUser(userObj: Users) {
    return this.http.post(this.baseApiUrl+'api/Users/login', userObj);
  }
  getNews(country: string) {
    console.log(country);
    return this.http.get(this.url + country + this.params + this.API_KEY);
  }
  getAllFavItem(){
    return this.http.get(this.baseApiUrl+'api/FavList/favItem');
  }
  getFavItemById(id: any){
    return this.http.get(this.baseApiUrl+'api/FavList/getById'+id);
  }
  deleteItemById(id: string){
    console.log(id);
    return this.http.delete(this.baseApiUrl+'api/FavList/'+id);

  }
  addFavItem(itemObj: any){
    return this.http.post(this.baseApiUrl+'api/FavList/addFavItem',itemObj);
  }

}
