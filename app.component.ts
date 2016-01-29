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
	        <li>{{test}}</li>
	      </ul>
	      <div><input [(ngModel)]="test"></div>
	      <button type="button" (click)="testF(test)">Click Me!</button>
`	     
/*
	    <ul>
	        <li *ngFor="#item of food">
	          <div><input [(ngModel)]="item.name"></div>
	        </li>
	    </ul>
    `
*/
})
export class AppComponent { 
	title = 'World';
	food = [
	  	new Food(1, 'Water'),
	  	new Food(13, 'Soda'),
	  	new Food(15, 'Tuna'),
	  	new Food(20, 'Bread')
	];

	testF(valor) {
		this.food.push(new Food(100,valor));
		this.test="";
	}
}
/*
export class AppComponent {
  title: string;

  constructor() {
    this.title = 'World';
  }
}*/
