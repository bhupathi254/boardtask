import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Board, Card, Comments } from './core/definitions';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'boardtask';
  board: Board;
  LIST_IDS: string[];
  connectedTo: string[];
  constructor(public dialog: MatDialog) {
    this.connectedTo = [];
    this.LIST_IDS = [];
    this.board = {
      title: 'Developers',
      lists: []
    }
  }

  private makeid() {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', length=8;
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
 

  addList() {
    const id = this.makeid()
    this.board.lists.push({
      title: `List`,
      id,
      cards: []
    });
    this.connectedTo.push(id);
  }
  deleteList(index: number): void {
    this.board.lists.splice(index, 1);    
    this.connectedTo = this.board.lists.map(v=>v.id);
  }

  deleteCard(index:number, cardIndex: number){
    this.board.lists[index].cards.splice(cardIndex, 1);
  }

  editCard(index: number, cardIndex: number, card: Card){
    const dialogRef = this.dialog.open(CardViewComponent, {
      data: {...card}
    });
    const sub = dialogRef.afterClosed().subscribe((result: Card) => {
      if(result){
        this.board.lists[index].cards[cardIndex] = result;
      }
      sub.unsubscribe();
    })
  }

  addCard(index: number) {
    const dialogRef = this.dialog.open(CardViewComponent);
    const sub = dialogRef.afterClosed().subscribe((result: Card) => {
      this.board.lists[index].cards.push(result);      
      sub.unsubscribe();
    })
  }
  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  addId(i: number, j: number) {
    this.LIST_IDS.push('cdk-drop-list-' + i + '' + j);
    return i + '' + j;
  }
}

@Component({
  selector: 'app-card-view',
  templateUrl: '../app/shared/card-view/card-view.component.html',
  styleUrls: ['../app/shared/card-view/card-view.component.scss']
})
export class CardViewComponent {

  card: Card;
  comment: Comments;
  constructor(
    public dialogRef: MatDialogRef<CardViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Card) {
    this.comment = {
      comment: '',
      time: null as any
    };
    this.card = {
      title: data?data.title : '',
      description: data?data.description :'',
      comments: data?data.comments : []
    };
  }

  onNoClick() {
    this.dialogRef.close();
  }

  addComment(comment: Comments) {
    this.card.comments.push({ comment: comment.comment, time: new Date });
    comment.comment = '';
  }

}
