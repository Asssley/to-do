import { Session } from 'express-session';
import { Task } from '../repositories/Task';
import { User } from '../repositories/User';

declare module 'express-serve-static-core' {
  interface Request {
    session: Session & {
      userId?: string,
      taskList: Task[]
    }
  }
}
