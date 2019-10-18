import { Component, DoCheck, OnInit } from '@angular/core';
import { IObject } from '../list.I';
import { LocalStorageService } from '../../todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements DoCheck, OnInit {
  lists: IObject[];
  checkedClass: string = 'checked';
  checkingClass: string = 'checking';
  inputText: string = '';
  showList: boolean = true;
  buttonValueText: string = 'Show List';
  todoListText: string = '';


  constructor(public localStorageService: LocalStorageService) { }

  ngDoCheck(): void {
    this.todoTextChange();
    this.saveTodoListNewData();
  }
  ngOnInit(): void {
    this.setTodoListData();
  }
  private setTodoListData(): void {
    if (!this.localStorageService.storage.get('local_todolist')) this.localStorageService.doSomethingAwesome();
    this.lists = this.localStorageService.storage.get('local_todolist');
  }

  private saveTodoListNewData(): void {
    this.localStorageService.storage.remove('local_todolist');
    this.localStorageService.storage.set('local_todolist', this.lists);
  }

  private todoTextChange(): void {
    if (this.lists.length > 0) {
      this.todoListText = 'ToDo List';
    }
    else {
      this.showList = !this.showList;
      this.todoListText = 'ToDo List empty';
    }
  }

  public itemChecked(item: IObject): void {
    item.checkState = !item.checkState;
  }

  public showTodoList(): void {
    this.showList = !this.showList;
    this.buttonValueText === 'Show List' ?
      this.buttonValueText = 'Hide List' : this.buttonValueText = 'Show List';
  }

  public createElement(item: string): void {
    if (this.inputText) {
      this.lists.push({ id: this.lists.length + 1, item: this.inputText, checkState: true });
      this.inputText = null;
    }
  }

  public deleteElement(item: IObject): void {
    this.lists.splice(this.lists.indexOf(item), 1);
  }

  public setInputValue(value: string): void {
    this.inputText = value;
  }
}
