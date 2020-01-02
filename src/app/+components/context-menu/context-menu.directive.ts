import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import { ContextMenuService } from '../../+services/context-menu.service';
import { AppService } from '../../+services/app.service';

@Directive({
  selector: '[appContextMenu]'
})
export class ContextMenuDirective implements AfterViewInit
{
  element: HTMLElement;
  constructor(
    private AppService: AppService,
    private ContextMenuService: ContextMenuService,
    private ElementRef: ElementRef)
  {
    this.element = this.ElementRef.nativeElement;
  }

  ngAfterViewInit(): void
  {
    setTimeout(() =>
    {
      this.element.firstElementChild.addEventListener('contextmenu', (ev: any) =>
      {
        ev.preventDefault();

        this.ContextMenuService.element = this.AppService.currentPage.elementData.find(o => o.guid == this.element.id);
        this.ContextMenuService.html = this.element.innerHTML;
        this.ContextMenuService.x = ev.pageX;
        this.ContextMenuService.y = ev.pageY;
        this.ContextMenuService.isVisible = true;
      }, false);
    }, 10);
  }

}
