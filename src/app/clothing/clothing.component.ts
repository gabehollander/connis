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
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-clothing',
  templateUrl: './clothing.component.html',
  styleUrls: ['./clothing.component.css']
})
export class ClothingComponent implements AfterViewInit, OnDestroy, OnInit {

  merchandise;
  valButton = "Save";
  selectedFile: File = null;
  cart = [];
  cartTotal = 0;
  selectedSize = "medium";

  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  constructor(private cd: ChangeDetectorRef,
    private newService: CommonService,
    public auth: AuthService) { }

  ngOnInit() {
    this.merchandise = this.newService.getMerchandise().subscribe(data => {
    this.merchandise = data
  })
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

  onSave = function(post, isValid: boolean) {

    var reader:FileReader = new FileReader();

    //Promise chain for making a post

    let promise = new Promise((resolve, reject) => {
      reader.readAsDataURL(this.selectedFile);
      reader.onloadend = () => {
          resolve(reader.result.split(',')[1]);
      };

    }).then(data => {
      post.content = data;
      post.mode = this.valButton;
      this.valButton = "Save";
      this.newService.saveMerchandise(post)
        .subscribe(data => { alert(data.data);
          this.ngOnInit();
        },error => this.errorMessage = error);
    });
  }

  delete = function(id) {
    this.newService.deleteMerchandise(id)
      .subscribe(data => {alert(data.data); this.ngOnInit();}, error => this.errorMessage = error)
  }

  addItem(price, item, size) {
    const newItem = {
      price: price,
      item: item,
      size: size
    }
    this.cart.push(newItem);
    this.cartTotal = this.cartTotal + Number(price);
  }
  removeItem(i,c) {
    this.cart.splice(i,1);
    this.cartTotal = this.cartTotal - Number(c.price);

  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  getImage(buf){
    return "data:image/jpeg;base64," + buf;
  }

}
