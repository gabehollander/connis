import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef } from '@angular/core';

import { NgForm } from '@angular/forms';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-clothing',
  templateUrl: './clothing.component.html',
  styleUrls: ['./clothing.component.css']
})
export class ClothingComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  constructor(private cd: ChangeDetectorRef,
    private newService: CommonService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    const style = {
      base: {
        lineHeight: '24px',
        fontFamily: 'monospace',
        fontSmoothing: 'antialiased',
        fontSize: '19px',
        '::placeholder': {
          color: 'purple'
        }
      }
    };

   this.card = elements.create('card');
   this.card.mount(this.cardInfo.nativeElement);

   this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      this.createCharge(token);
      // ...send the token to the your backend to process the charge
    }
  }

  createCharge(token) {
    this.newService.createCharge(token)
      .subscribe(data => { alert(data.data);
      },error => alert('error:'+error));
  }

}
