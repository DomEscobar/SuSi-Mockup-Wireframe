import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { App, Page, Framework } from '../+models/app';

@Injectable({
  providedIn: 'root'
})
export class AppService
{
  isDragable = true;
  isResizeable = true;

  isContentEditAble = true;

  zoom = 0.9;
  appData: App = new App();
  currentPage: Page;
  customParts: CustomPart[] = new Array();

  constructor(private http: HttpClient)
  {
    const page = new Page();
    page.name = 'Page 1';
    this.appData.pages.push(page);
    this.currentPage = page;
  }

  public async initParts(framework: Framework): Promise<void>
  {
    switch (framework)
    {
      case Framework.Bootstrap:
        this.customParts = await this.http.get<CustomPart[]>('./assets/bootstrap.json').toPromise();
        break;

      case Framework.Bulma:
        this.customParts = await this.http.get<CustomPart[]>('./assets/bulma.json').toPromise();
        break;
    }

  }

  read(): Observable<CustomPart[]>
  {
    return this.http.get<CustomPart[]>('./assets/bulma.json');
  }
}

export class CustomPart
{
  name: string;
  html: string;
}