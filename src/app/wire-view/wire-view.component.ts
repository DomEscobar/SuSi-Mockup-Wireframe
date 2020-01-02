import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { AppService } from '../+services/app.service';
import { Page } from '../+models/app';

@Component({
  selector: 'app-wire-view',
  templateUrl: './wire-view.component.html',
  styleUrls: ['./wire-view.component.sass']
})
export class WireViewComponent implements AfterViewInit
{
  isvisible: boolean = true;

  message;

  @Input()
  items: Page[] = new Array();

  @Input()
  childElement = false;

  @Input()
  level: number;

  constructor(
    public AppService: AppService,
    private changeDetectorRef: ChangeDetectorRef)
  {
  }

  ngAfterViewInit()
  {
    if (this.AppService.appData.level < this.level)
    {
      this.AppService.appData.level = this.level;
    }
  }

  addParent()
  {
    this.items.push(new Page());
    this.changeDetectorRef.detectChanges();
  }

  addChild(page: Page)
  {
    page.pages.push(new Page());
    this.changeDetectorRef.markForCheck();
  }

  remove(index)
  {
    this.items.splice(index, 1);
    this.changeDetectorRef.detectChanges();
  }

  openPage(page: Page)
  {
    this.AppService.currentPage.elementData.forEach(data =>
    {
      data.html = document.getElementById(data.guid).innerHTML;
    });


    this.AppService.currentPage = page;
  }
}