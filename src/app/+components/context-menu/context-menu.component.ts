import { Component, OnInit, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { AppService } from '../../+services/app.service';
import { ContextMenuService } from '../../+services/context-menu.service';
import { Helper } from '../../static/helper';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.sass']
})
export class ContextMenuComponent implements AfterViewInit
{
  constructor(
    private ElementRef: ElementRef,
    private appService: AppService,
    public contextMenuService: ContextMenuService) { }

  ngAfterViewInit()
  {
    const element: HTMLElement = this.ElementRef.nativeElement;
    element.addEventListener('mouseleave', (ev) =>
    {
      this.contextMenuService.isVisible = false;
    });
  }

  arrange(event, type)
  {
    const index = this.appService.currentPage.elementData.findIndex(o => o.guid == this.contextMenuService.element.guid);

    //backwards
    if (type == 2)
    {
      if (index == 0)
      {
        return;
      }

      this.appService.currentPage.elementData = Helper.swapArray(this.appService.currentPage.elementData, index, index - 1);
      return;
    }

    //forwards
    this.appService.currentPage.elementData = Helper.swapArray(this.appService.currentPage.elementData, index, index + 1);
  }

  delete()
  {
    this.appService.currentPage.elementData.splice(this.appService.currentPage.elementData.findIndex(o => o.guid == this.contextMenuService.element.guid), 1);
  }

  copy(event)
  {
    const copied = JSON.parse(JSON.stringify(this.contextMenuService.element));
    copied.html = document.getElementById(this.contextMenuService.element.guid).innerHTML;
    copied.guid = Helper.generateQuickGuid();
    this.appService.currentPage.elementData.push(copied);

    setTimeout(() =>
    {
      const target: any = document.getElementById(copied.guid).firstElementChild;

      target.style.webkitTransform =
        target.style.transform =
        'translate(' + (event.pageX - 150) + 'px, ' + event.pageY + 'px)'

      target.setAttribute('data-x', (event.pageX - 150))
      target.setAttribute('data-y', event.pageY)
    }, 10);
  }


  setLiveHTML(html: string)
  {
    this.contextMenuService.element.html = html;

    // Workaround for refresh
    this.appService.isContentEditAble = false;
    setTimeout(() =>
    {
      this.appService.isContentEditAble = true;
    }, 1);
  }
}
