import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[adminButtonDirective]'
})
export class AdminButtonDirectiveDirective {

  constructor(private eleRef:ElementRef) {
    eleRef.nativeElement.style.fontSize="13px"
    eleRef.nativeElement.style.textTransform="captalize"
    eleRef.nativeElement.style.marginLeft="7px";
    eleRef.nativeElement.style.marginBottom="7px";
   }

}
