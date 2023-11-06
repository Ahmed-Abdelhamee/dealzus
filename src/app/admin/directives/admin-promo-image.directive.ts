import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAdminPromoImage]'
})
export class AdminPromoImageDirective {

  constructor(private eleRef:ElementRef) { 
    eleRef.nativeElement.style.height="120px";
    eleRef.nativeElement.style.width="140px";
    eleRef.nativeElement.style.borderRadius="7px";
  }

}
