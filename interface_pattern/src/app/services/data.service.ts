import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersDto } from '../dto/users.dto';
import { Observable } from 'rxjs';
import { PostsDto } from '../dto/posts.dto';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UsersDto> {
    const data = this.http.get<UsersDto>('http://localhost:3000/users')
    return data
  }

  exportUsers(): Observable<UsersDto> {
    const data = this.http.get<UsersDto>('http://localhost:3000/users/download')
    return data
  }

  getPosts(): Observable<PostsDto> {
    const data = this.http.get<PostsDto>('http://localhost:3000/post/allPosts')
    return data
  }

  removePost(id: string) {
    return this.http.delete(`http://localhost:3000/post/${id}`)
  }
}
