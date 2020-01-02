import { Directive, AfterViewInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
declare const $: any;
declare const MediumEditor: any;
declare const CustomHtml: any;
declare const FontSize: any;
declare const pickerExtension: any;
declare const MediumEditorTable: any;


@Directive({
  selector: '[MediumEditor]'
})
export class MediumEditorDirective
{

  @Input()
  set saveClicked(issave: boolean)
  {
    if (issave)
    {
      this.saveClickEvent();
    }

  }

  @Input()
  sectionIndex: number = -1;

  @Output()
  codeVarChange: EventEmitter<any> = new EventEmitter();


  constructor(
    private elementRef: ElementRef) { }

  ngAfterViewInit()
  {
    const ele: HTMLElement = this.elementRef.nativeElement;

    if(ele.firstElementChild instanceof HTMLImageElement)
    {
      return;
    }

    var editor = new MediumEditor(ele.firstElementChild, {
      disableExtraSpaces: true,
      toolbar: {
        buttons: [
          "bold"
          , "italic"
          , "underline"
          , "anchor"
          , "Font size"
         , "colorPicker"
        ]
      }
      , extensions: {
        "Font size": new FontSize(),
        "colorPicker": pickerExtension

      }

    });

    editor.subscribe('keydown', (event, editorElement) =>
    {
      const ele = this.elementRef.nativeElement;
    });

    editor.subscribe("editableKeydownEnter", (event, element) =>
    {
      if (event.which == 13)
      {
        if (window.getSelection)
        {
          var selection = window.getSelection(),
            range = selection.getRangeAt(0),
            br = document.createElement("br");
          range.deleteContents();
          range.insertNode(br);
          range.setStartAfter(br);
          range.setEndAfter(br);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
          event.preventDefault();
          return false;
        }
      }
    });

  }

  saveClickEvent()
  {
    if (this.sectionIndex != -1)
    {
    } else
    {// side Editor
      this.codeVarChange.emit(this.elementRef.nativeElement.innerHTML);
    }
  }


}
