import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayPropertiesService
{
  width = 0;
  height = 0;
  x = 0;
  y = 0;
  isResizing: boolean;

  constructor() { }

  public setRect(w: number, h: number, x: number, y: number)
  {
    this.width = Number(w.toFixed(0));
    this.height = Number(h.toFixed(0));
    this.x = Number(x.toFixed(0));
    this.y = Number(y.toFixed(0));
  }
}
