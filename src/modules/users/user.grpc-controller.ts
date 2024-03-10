import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
// import { User, GetUserRequest, AddUserRequest } from './protos/users_pb';

class User {
  private userId: string;
  private name: string;
  private email: string;

  constructor(userId: string, name: string, email: string) {
    this.userId = userId;
    this.name = name;
    this.email = email;
  }
}

export function getUser(call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>): void {
  const { userId } = call.request;

  const user = new User(userId, 'John Doe', 'john@example.com');
  callback(null, user);
}

export function addUser(call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>): void {
  const { name, email } = call.request;

  const user = new User('123', name, email);
  callback(null, user);
}
