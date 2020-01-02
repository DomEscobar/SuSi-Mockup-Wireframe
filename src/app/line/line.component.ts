import { Component, OnInit, Input, ElementRef, AfterViewInit, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { DragOptions } from 'ngx-interactjs';
import { Helper } from '../static/helper';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.sass']
})
export class LineComponent implements OnInit, AfterViewChecked
{
  dragOptions: DragOptions = new DragOptions();

  @Input()
  line: Line;

  @Output()
  lineChange: EventEmitter<Line> = new EventEmitter();

  @Output()
  onRemove: EventEmitter<string> = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  ngAfterViewChecked()
  {
    // update the posiion attributes
    this.elementRef.nativeElement.firstElementChild.setAttribute('data-x', this.line.left);
    this.elementRef.nativeElement.firstElementChild.setAttribute('data-y', this.line.top);
  }

  ngOnInit()
  {
    this.dragOptions.onmove = (event) =>
    {

      var target: HTMLElement = event.target;
      // keep the dragged position in the data-x/data-y attributes
      const y = this.line.isvertical ? 0 : (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
      const x = this.line.isvertical ? (parseFloat(target.getAttribute('data-x')) || 0) + event.dx : 0;

      // translate the element
      this.line.left = Number(x).toFixed(0);
      this.line.top = Number(y).toFixed(0);

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);

      this.lineChange.emit(this.line);
    }
  }

  remove()
  {
    this.onRemove.emit(this.line.guid);
  }
}


export class Line
{
  guid: string;
  top;
  left;
  isvertical: boolean;

  constructor(isVert: boolean)
  {
    this.guid = Helper.generateQuickGuid();
    this.isvertical = isVert;
    this.top = isVert ? 0 : 90;
    this.left = isVert ? 250 : 0;
  }
}