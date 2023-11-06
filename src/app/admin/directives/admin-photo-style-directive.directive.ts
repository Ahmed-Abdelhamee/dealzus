import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[adminPhotoStyleDirective]'
})
export class AdminPhotoStyleDirectiveDirective {

  constructor(private elementRef:ElementRef) {
    elementRef.nativeElement.style.height="85px";
    elementRef.nativeElement.style.width="120px";
    elementRef.nativeElement.style.marginTop="10px";
    elementRef.nativeElement.style.borderRadius="7px";

   }

}
