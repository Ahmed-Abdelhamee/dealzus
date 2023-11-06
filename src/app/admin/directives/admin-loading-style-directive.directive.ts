import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[adminLoadingStyleDirective]'
})
export class AdminLoadingStyleDirectiveDirective {

  constructor(private eleRef:ElementRef) { 
    eleRef.nativeElement.style.marginTop="7px";
    eleRef.nativeElement.style.display="inline-block";
  }

}
