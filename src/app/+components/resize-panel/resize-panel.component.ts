import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DisplayPropertiesService } from '../../+services/display-properties.service';
import { DragOptions, ResizeOptions } from 'ngx-interactjs';
import { AppService } from '../../+services/app.service';

@Component({
  selector: 'app-resize-panel',
  templateUrl: './resize-panel.component.html',
  styleUrls: ['./resize-panel.component.sass']
})
export class ResizePanelComponent implements OnInit
{
  @ViewChild('serf', { static: false })
  resizePanel: ElementRef;

  opt = new ResizeOptions();
  marginLeftRight: number = 0;
  marginTopBottom: number = 0;
  constructor(
    public AppService: AppService,
    public DisplayPropertiesService: DisplayPropertiesService)
  {

    this.opt.resizemove = (event) =>
    {
      var target: any = this.AppService.selectedPartElement;

      var x = (parseFloat(target.getAttribute('data-x')) || 0)
      var y = (parseFloat(target.getAttribute('data-y')) || 0)
      const width = event.rect.width;
      const height = event.rect.height;

      // update the element's style
      target.style.width = width + 'px'
      target.style.height = height + 'px'

      // translate when resizing from top or left edges
      x += event.deltaRect.left;
      y += event.deltaRect.top;

      target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
      this.DisplayPropertiesService.dataX = x;
      this.DisplayPropertiesService.dataY = y;

      this.initBounds(target);
      this.DisplayPropertiesService.setRect(width, height, x, y);
    };

    this.DisplayPropertiesService.onChange.subscribe(() =>
    {
      this.resizePanel.nativeElement.style.webkitTransform =
        this.resizePanel.nativeElement.style.transform =
        'translate(' + this.DisplayPropertiesService.dataX + 'px, ' + this.DisplayPropertiesService.dataY + 'px)';

      this.initBounds(this.AppService.selectedPartElement);
    });
  }

  private initBounds(element)
  {
    var style = element.currentStyle || window.getComputedStyle(element);
    this.marginLeftRight = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    this.marginTopBottom = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
  }

  ngOnInit()
  {

  }

}
