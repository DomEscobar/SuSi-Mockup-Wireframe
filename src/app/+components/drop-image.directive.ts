import { Directive, ElementRef } from '@angular/core';
import { AppService } from '../+services/app.service';
import { ElementData } from '../+models/elementData';
import { Helper } from '../static/helper';

@Directive({
  selector: '[appDropImage]'
})
export class DropImageDirective
{

  dropArea;

  constructor(
    private appService: AppService,
    private elementRef: ElementRef) { }

  ngAfterViewInit(): void
  {
    this.dropArea = this.elementRef.nativeElement;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName =>
    {
      this.dropArea.addEventListener(eventName, this.preventDefaults, false)
      document.body.addEventListener(eventName, this.preventDefaults, false)
    });

    ['dragenter', 'dragover'].forEach(eventName =>
    {
      this.dropArea.addEventListener(eventName, this.highlight, false)
    });

    ['dragleave', 'drop'].forEach(eventName =>
    {
      this.dropArea.addEventListener(eventName, this.unhighlight, false)
    });

    this.dropArea.addEventListener('drop', this.handleDrop, false)

  }

  preventDefaults = (e) =>
  {
    e.preventDefault()
    e.stopPropagation()
  }

  highlight = (e) =>
  {
    this.dropArea.classList.add('highlight')
  }

  unhighlight = (e) =>
  {
    this.dropArea.classList.remove('active')
  }

  handleDrop = (e) =>
  {
    var dt = e.dataTransfer
    var files = dt.files

    this.handleFiles(files);
  }

  handleFiles(files)
  {
    files = [...files]
    files.forEach(this.previewFile)
  }

  previewFile = (file) =>
  {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () =>
    {
      let img = document.createElement('img')
      img.src = reader.result.toString();

      let div = document.createElement('div');
      div.appendChild(img);

      const part = new ElementData();
      part.html = div.innerHTML;
      part.guid = Helper.generateQuickGuid();
      this.appService.currentPage.elementData.push(part);
    }
  }
}
