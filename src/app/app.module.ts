import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule}   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxInteractjsModule } from 'ngx-interactjs';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { WireViewComponent } from './wire-view/wire-view.component';
import { NavigationComponent } from './wire-view/navigation/navigation.component';
import { NavItemComponent } from './wire-view/navigation/nav-item/nav-item.component';
import { LineComponent } from './line/line.component';
import { ContextMenuComponent } from './+components/context-menu/context-menu.component';
import { ContextMenuDirective } from './+components/context-menu/context-menu.directive';
import { ListenersDirective } from './+components/listeners.directive';
import { MediumEditorDirective } from './+components/medium-editor.directive';
import { NewComponentComponent } from './+components/new-component/new-component.component';
import { CodeFormatPipe } from './+components/code-format.pipe';
import { SearchPipe } from './+components/search.pipe';
import { DropImageDirective } from './+components/drop-image.directive';
import { ResizePanelComponent } from './+components/resize-panel/resize-panel.component';
import { DataXYDirective } from './+components/resize-panel/data-xy.directive';
import {AutosizeModule} from 'ngx-autosize';

@NgModule({
  declarations: [
    AppComponent,
    SanitizeHtmlPipe,
    WireViewComponent,
    NavigationComponent,
    NavItemComponent,
    LineComponent,
    ContextMenuComponent,
    ContextMenuDirective,
    ListenersDirective,
    MediumEditorDirective,
    NewComponentComponent,
    CodeFormatPipe,
    SearchPipe,
    DropImageDirective,
    ResizePanelComponent,
    DataXYDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxInteractjsModule,
    HttpClientModule,
    FormsModule,
    AutosizeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


