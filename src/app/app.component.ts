import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ecio-proj';

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.httpClient.get('https://lalala.com/lalalala').subscribe();
    throw new Error('this is an error');
  }
}
