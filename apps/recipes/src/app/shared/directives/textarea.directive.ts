import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[textareaResize]',
})
export class TextareaDirective implements AfterViewInit {
  textareaHeight: string = '';

  constructor(public renderer: Renderer2, public element: ElementRef) {}

  ngAfterViewInit() {
    this.resize();
    this.setTextareaHeight();
  }

  @HostListener('keyup', ['$event']) onKeyDown(e: KeyboardEvent) {
    const isCut = e.ctrlKey && e.key === 'x';
    const isDelete = e.key === 'Delete';
    if (isCut || isDelete) {
      this.resize('auto');
    } else {
      this.resize();
    }
    this.setTextareaHeight();
  }

  setTextareaHeight() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'height',
      this.textareaHeight
    );
  }

  resize(initialHeight: any = null) {
    const textarea = this.element.nativeElement;
    this.textareaHeight = initialHeight ?? textarea.height;

    if (textarea.scrollHeight > textarea.clientHeight) {
      this.textareaHeight = `${textarea.scrollHeight}px`;
    }
  }
}
