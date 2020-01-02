import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../+services/app.service';
import { CustomComponent } from 'src/app/+models/app';

@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.sass']
})
export class NewComponentComponent implements OnInit
{
  newComponent: CustomComponent = new CustomComponent();

  @Output()
  onCancel: EventEmitter<void> = new EventEmitter();

  @Output()
  onSave: EventEmitter<CustomComponent> = new EventEmitter();

  constructor(private AppService: AppService) { }

  ngOnInit()
  {
  }

  addNew()
  {
    this.AppService.appData.components.push(this.newComponent);
    this.onSave.emit(this.newComponent);
  }
}
