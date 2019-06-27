import {Injectable} from '@angular/core';
import {Task} from '../models/task';
import {fakeBackendProvider} from '../helpers/fake-backend';
import {HttpInterceptor} from '../helpers/http.interceptor';

@Injectable({providedIn: 'root'})
export class TaskService {
  constructor(private http: HttpInterceptor) {
  }

  getAllTasks() {
    return this.http.get(fakeBackendProvider.baseurl + 'api/task');
  }

  createTask(task: Task) {
    return this.http.post(fakeBackendProvider.baseurl + 'api/task', task);
  }

  updateTaskStatus(task: Task) {
    return this.http.put(fakeBackendProvider.baseurl + 'api/task', task);
  }

  deleteTask(id: number) {
    return this.http.delete(fakeBackendProvider.baseurl + 'api/task/' + id);
  }
}
