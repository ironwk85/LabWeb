import {Component} from 'angular2/core';
import {Food} from './food'

@Component({
    selector: 'my-app',
    template: `
    	<h1>Hello {{title}}</h1>
    	<p *ngIf="food.length > 3">Too much food!</p>
    	<p>Food:</p>
	      <ul>
	        <li *ngFor="#item of food">
	          {{ item.name }}
	        </li>
	      </ul>
    `
})
export class AppComponent { 
	title = 'World';
	food = [
  	new Food(1, 'Water'),
  	new Food(13, 'Soda'),
  	new Food(15, 'Tuna'),
  	new Food(20, 'Bread')
];
}
/*
export class AppComponent {
  title: string;

  constructor() {
    this.title = 'World';
  }
}*/
