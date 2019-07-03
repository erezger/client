export class Task {
  id: number;
  description: string;
  status: string;
  dueDate: Date;
  reporter?: string;
  assigneeTo?: string;
}
