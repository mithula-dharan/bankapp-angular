import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';




@Component({
  selector: 'app-delete-acc',
  templateUrl: './delete-acc.component.html',
  styleUrls: ['./delete-acc.component.css']
})
export class DeleteAccComponent implements OnInit {

  @Input() item:string|undefined

  @Output() onDelete=new EventEmitter()

  @Output() onCancel=new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  deleteFromChild(){
    this.onDelete.emit(this.item)
  }
  cancelFromChild(){
    this.onCancel.emit()
  }
}
