import { Injectable } from '@angular/core';
import { ElementData } from '../+models/elementData';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService
{
  isShowCode: boolean;
  isVisible: boolean;
  element: ElementData;
  html: string;
  x: number;
  y: number;

  constructor() { }

  getLiveHTML()
  {
    if (this.element == null)
    {
      return;
    }

    return document.getElementById(this.element.guid).innerHTML;
  }
}
