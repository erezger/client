import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {User} from '../models/user';
import {AuthenticationService} from '../services/authentication.service';
import {TaskService} from '../services/task.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../services/alert.service';
import {Task} from '../models/task';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
  currentUser: User;
  tasks = [];
  taskForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private taskService: TaskService,
    private alertService: AlertService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadAllTasks();
    this.taskForm = this.formBuilder.group({
      description: ['', Validators.required],
      dueDate: [Date, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.taskForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.taskForm.invalid) {
      return;
    }

    this.loading = true;
    const newTask = {
      description: this.f.description.value,
      dueDate: this.f.dueDate.value,
    } as Task;
    this.taskService.createTask(newTask)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('task added successfully!!', true);
          this.taskForm.reset();
          this.submitted = false;
          this.loading = false;
          this.loadAllTasks();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  private updateTaskStatus(task: Task, status: string) {
    task.status = status;
    this.taskService.updateTaskStatus(task)
      .pipe(first())
      .subscribe(() => this.loadAllTasks());
  }

  private deleteTask(id: number) {
    this.taskService.deleteTask(id)
      .pipe(first())
      .subscribe(() => this.loadAllTasks());
  }

  private loadAllTasks() {
    this.taskService.getAllTasks()
      .pipe(first())
      .subscribe((tasks: any) => {
          this.tasks = tasks;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
