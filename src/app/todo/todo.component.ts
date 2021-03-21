import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoModel } from './model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoList: Array<any>; // lista de tarefas vazia ( tipo: todo.models.ts )
  formGroup: FormGroup;
  todoObject: TodoModel;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      task: ['', Validators.compose([
        Validators.minLength(3), // qtd minima de caracteres
        Validators.maxLength(30), // qtd maxima de caracteres
        Validators.required, // é obrigatiorio
      ])]
    });
  }

  ngOnInit() {
    this.loadFromLocalStorage();
  }

  taskAdd() {
    const task = this.formGroup.get('task').value;
    const data = {
      todo: task,
      done: false
    };
    console.log(this.todoList);
    // this.todoObject.done = false;
    // this.todoObject.todo = task;
    console.log(data);
    this.todoList.push(data);
    this.saveOnLocalStorage();
    this.formGroup.reset();
  }

  taskRemove(todo: TodoModel) {
    const index = this.todoList.indexOf(todo);
    if (index !== -1) {
      this.todoList.splice(index, 1);
    }
    this.saveOnLocalStorage();
  }

  taskDone(todo: TodoModel) {
    const index = this.todoList.indexOf(todo);
    if (index !== -1) {
      todo.done = true;
    }
    this.saveOnLocalStorage();
  }

  saveOnLocalStorage() {
    const data = JSON.stringify(this.todoList);
    localStorage.setItem('todos', data);
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem('todos');
    this.todoList = JSON.parse(data);
  }

}