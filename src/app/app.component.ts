import { Component, ViewChildren, QueryList } from '@angular/core';
import { DisplayPropertiesService } from './+services/display-properties.service';
import { ElementData } from './+models/elementData';
import { AppService } from './+services/app.service';
import { Helper } from './static/helper';
import { Line } from './line/line.component';
import { DragOptions } from 'ngx-interactjs';
import { InteractDirective } from '../../projects/ngx-interactjs/src/lib/interact.directive';
import { Framework, App, CustomComponent } from './+models/app';
import { ContextMenuService } from './+services/context-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent
{
  @ViewChildren(InteractDirective)
  interacts: QueryList<InteractDirective>;

  x = 0;
  y = 0;
  isFwOpen: boolean;
  isShowCode: boolean;
  isWireview: boolean;
  isNewCustomComponent: boolean;
  opt = new DragOptions();
  framework = Framework;
  search = '';

  constructor(
    public ContextMenuService: ContextMenuService,
    public AppService: AppService,
    public displayPropertiesService: DisplayPropertiesService)
  {
    document.body.addEventListener('wheel', (event) =>
    {
      if (event.deltaY < 0)
      {
        this.AppService.zoom += 0.1;
      }
      else if (event.deltaY > 0)
      {
        this.AppService.zoom -= 0.1;
      }
    });

    document.body.addEventListener('mousemove', (e) =>
    {
      if (!this.displayPropertiesService.isResizing)
      {
        return;
      }

      this.x = e.clientX;
      this.y = e.clientY + 20;
    }, true);

    this.opt.onmove = (event) =>
    {
      var target = event.target
      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

      // translate the element
      target.style.left = x + 'px';
      target.style.top = y + 'px';

      // update the posiion attributes
      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)
    };

    this.initFramework(this.AppService.appData.framework);
  }

  private initFramework(framework: Framework)
  {
    switch (framework)
    {
      case Framework.Bootstrap:
        Helper.changeFW('assets/bootstrap.min.css');
        break;

      case Framework.Bulma:
        Helper.changeFW('assets/bulma.min.css');
        break;
    }

    this.AppService.initParts(framework);
  }

  add(event, html)
  {
    const part = new ElementData();
    part.html = html;
    part.guid = Helper.generateQuickGuid();
    this.AppService.currentPage.elementData.push(part);

    setTimeout(() =>
    {
      const target: any = document.getElementById(part.guid).firstElementChild;

      target.style.webkitTransform =
        target.style.transform =
        'translate(' + 0 + 'px, ' + event.pageY + 'px)'

      target.setAttribute('data-x', 0)
      target.setAttribute('data-y', event.pageY)

      // TODO to much
      this.switchDragable();
      this.switchResizeable();
    }, 10);
  }

  addLine(isVertical: boolean)
  {
    const line = new Line(isVertical);
    this.AppService.currentPage.lines.push(line);
  }

  removeLine(guid: String)
  {
    this.AppService.currentPage.lines.splice(this.AppService.currentPage.lines.findIndex(o => o.guid == guid), 1);
  }

  export()
  {
    this.AppService.currentPage.elementData.forEach(data =>
    {
      data.html = document.getElementById(data.guid).innerHTML;
    });

    var sJson = JSON.stringify(this.AppService.appData);
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', "susMockup.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  onImport(event)
  {
    var reader = new FileReader();
    reader.onload = (event2: any) =>
    {
      this.AppService.appData = JSON.parse(event2.target.result);
      this.AppService.currentPage = this.AppService.appData.pages[0];
      this.initFramework(this.AppService.appData.framework);
    };

    reader.readAsText(event.target.files[0]);
  }

  zoom(zoomIn)
  {
    this.AppService.zoom += zoomIn ? 0.1 : -0.1;
  }

  switchDragable()
  {
    this.interacts.forEach(interact =>
    {
      interact.enableDrag(this.AppService.isDragable);
    });
  }

  switchResizeable()
  {
    this.interacts.forEach(interact =>
    {
      interact.enableResize(this.AppService.isResizeable);
    });
  }

  switchFW(framework: Framework)
  {
    this.AppService.appData.framework = framework;
    this.initFramework(framework);
  }

  removeCustomComponent(event: Event, customComponent: CustomComponent)
  {
    event.preventDefault();
    event.stopImmediatePropagation();

    const index = this.AppService.appData.components.findIndex(o => o.name == customComponent.name);
    this.AppService.appData.components.splice(index, 1);
  }

  fileInputclick()
  {
    const fileinput = document.getElementById('fileinp');
    fileinput.click();
  }
}