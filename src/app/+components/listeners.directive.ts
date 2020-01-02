import { Directive, Input, AfterViewInit } from '@angular/core';
import { ElementData } from '../+models/elementData';
import { AppService } from '../+services/app.service';
import { DisplayPropertiesService } from '../+services/display-properties.service';
import { CollisionService } from '../+services/collision.service';

@Directive({
  selector: '[appListeners]'
})
export class ListenersDirective implements AfterViewInit
{
  @Input()
  set listeningTo(listeningTo: ElementData)
  {
    this.addListeners(listeningTo);
  }

  get listeningTo()
  {
    return null;
  }

  constructor(
    private collisionService: CollisionService,
    private AppService: AppService,
    private DisplayPropertiesService: DisplayPropertiesService) { }

  ngAfterViewInit(): void
  {
  }

  private addListeners(part: ElementData)
  {
    part.dragOptions.onmove = (event) =>
    {
      if (this.collisionService.isCollision)
      {
        return;
      }

      var target: HTMLElement = event.target;
      target.id = part.guid;
      // keep the dragged position in the data-x/data-y attributes
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
      const width = event.rect.width;
      const height = event.rect.height;
      this.DisplayPropertiesService.isResizing = true;

      // translate the element
      target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'

      // update the posiion attributes
      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)
      this.setRect(part, x, y, width, height);
      const paperX = (<HTMLElement>document.getElementById('contiPaper')).getBoundingClientRect().left;
      const paperY = (<HTMLElement>document.getElementById('contiPaper')).getBoundingClientRect().top;

      this.DisplayPropertiesService.setRect(width, height, target.getBoundingClientRect().left - paperX, target.getBoundingClientRect().top - paperY);
    };

    part.dragOptions.onend = (event) =>
    {
      this.DisplayPropertiesService.isResizing = false;
    };

    part.resizeOptions.resizemove = (event) =>
    {
      if (this.collisionService.isCollision)
      {
        return;
      }

      this.DisplayPropertiesService.isResizing = true;
      var target = event.target;
      target.id = part.guid;

      var x = (parseFloat(target.getAttribute('data-x')) || 0)
      var y = (parseFloat(target.getAttribute('data-y')) || 0)
      const width = event.rect.width;
      const height = event.rect.height;

      // update the element's style
      target.style.width = width + 'px'
      target.style.height = height + 'px'

      // translate when resizing from top or left edges
      x += event.deltaRect.left
      y += event.deltaRect.top

      target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)'


      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)
      this.DisplayPropertiesService.setRect(width, height, x, y);
      this.setRect(part, x, y, width, height);
    };

    part.resizeOptions.resizeend = (event) =>
    {
      this.DisplayPropertiesService.isResizing = false;
    };
  }

  private setRect(part: ElementData, x, y, w, h)
  {
    part.width = w;
    part.height = h;
    part.xPos = x;
    part.xPosEnd = x + w;
    part.yPos = y;
    part.yPosEnd = y + h;
    this.checkCollision(part);
  }

  public checkCollision(part: ElementData)
  {
    for (const elmentData of this.AppService.currentPage.elementData)
    {
      if (elmentData.guid == part.guid)
      {
        continue;
      }

      // this.collisionService.checkCollision(part, elmentData);
    }
  }

}
