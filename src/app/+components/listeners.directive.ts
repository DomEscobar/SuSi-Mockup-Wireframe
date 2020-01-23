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
    setTimeout(() =>
    {
      document.getElementById(part.guid).addEventListener('click', (ev: Event) =>
      {
        ev.stopPropagation();
        ev.preventDefault();
        this.AppService.selectedPartElement = document.getElementById(part.guid).firstElementChild;

        const x = (parseFloat(this.AppService.selectedPartElement.getAttribute('data-x')) || 0);
        const y = (parseFloat(this.AppService.selectedPartElement.getAttribute('data-y')) || 0);

        const width = this.AppService.selectedPartElement.clientWidth;
        const height = this.AppService.selectedPartElement.clientHeight;

        this.DisplayPropertiesService.dataX = x;
        this.DisplayPropertiesService.dataY = y;
        this.DisplayPropertiesService.width = width;
        this.DisplayPropertiesService.height = height;

        if (!(this.AppService.selectedPartElement instanceof HTMLImageElement))
        {
          (<HTMLElement>this.AppService.selectedPartElement).setAttribute("contenteditable", "true");
        } else
        {
          (<HTMLElement>this.AppService.selectedPartElement).classList.add('noSelectOk');
        }

        this.DisplayPropertiesService.onChange.emit();
      });
    }, 100);

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
      const width = event.clientWidth;
      const height = event.clientHeight;
      this.DisplayPropertiesService.isResizing = true;

      // translate the element
      target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'

      // update the posiion attributes
      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)
      this.DisplayPropertiesService.dataX = x;
      this.DisplayPropertiesService.dataY = y;
      this.DisplayPropertiesService.width = width;
      this.DisplayPropertiesService.height = height;

      const paperX = (<HTMLElement>document.getElementById('contiPaper')).getBoundingClientRect().left;
      const paperY = (<HTMLElement>document.getElementById('contiPaper')).getBoundingClientRect().top;
    };

    part.dragOptions.onend = (event) =>
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
