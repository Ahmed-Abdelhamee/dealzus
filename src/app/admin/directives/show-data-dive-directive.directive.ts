import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appShowDataDiveDirective]'
})
export class ShowDataDiveDirectiveDirective {

  constructor(eleRef:ElementRef) {
    eleRef.nativeElement.style.height="80vh";
    eleRef.nativeElement.style.border="2px solid goldenrod";
    eleRef.nativeElement.style.marginTop="20px";
    eleRef.nativeElement.style.overflow="auto";
   }

}
