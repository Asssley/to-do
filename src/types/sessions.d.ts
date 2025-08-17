import { Session } from 'express-session';
import { Task } from '../models/Task';
import { User } from '../models/User';

declare module 'express-serve-static-core' {
  interface Request {
    session: Session & {
      userId?: string,
      taskList: Task[]
    },
    user?: User
  }
}
