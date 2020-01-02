import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit
{
  @Input()
  items: any[];

  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit()
  {
  }

  close()
  {
    this.onClose.emit();
  }

}
