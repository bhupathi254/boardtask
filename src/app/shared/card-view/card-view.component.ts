import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card, Comments } from 'src/app/core/definitions';

@Component({
  selector: 'app-card-view',
  templateUrl: '../app/shared/card-view/card-view.component.html',
  styleUrls: ['../app/shared/card-view/card-view.component.scss']
})



export class CardViewComponent {

  card: Card;
  
  constructor(
    public dialogRef: MatDialogRef<CardViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Card) {
    
    this.card = {
      title: '',
      description: '',
      comments: []
    };  
  }

}