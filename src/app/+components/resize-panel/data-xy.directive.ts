import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';
import { AppService } from '../../+services/app.service';
import { DisplayPropertiesService } from '../../+services/display-properties.service';
import { ResizeOptions } from 'ngx-interactjs';

@Directive({
  selector: '[appDataXY]'
})
export class DataXYDirective implements AfterViewInit
{
  @Input()
  set dataXY(data)
  {
    if (this.element == null)
    {
      return;
    }

    this.element.style.webkitTransform =
      this.element.style.transform =
      'translate(' + data[0] + 'px, ' + data[1] + 'px)'
  }

  element: HTMLElement;
  
  constructor(
    private DisplayPropertiesService: DisplayPropertiesService,
    private AppService: AppService,
    private elementRef: ElementRef) { }

  ngAfterViewInit()
  {
    this.element = this.elementRef.nativeElement;
  }

}
