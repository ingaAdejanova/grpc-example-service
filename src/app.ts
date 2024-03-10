import fastify, { FastifyInstance } from 'fastify';
import { Server, ServerCredentials, loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync, PackageDefinition } from '@grpc/proto-loader';
import path from 'path';
import { getUser, addUser } from './modules/users/user.grpc-controller';

const app: FastifyInstance = fastify();

const userProtoPath = path.resolve(__dirname, '../src/protos/users.proto');
const packageDefinition: PackageDefinition = loadSync(userProtoPath);
const userPackage = loadPackageDefinition(packageDefinition) as any;

const server = new Server();

server.addService(userPackage.UserService.service, {
  GetUser: getUser,
  AddUser: addUser,
});

const port = '0.0.0.0:50051';
server.bindAsync(port, ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to bind server:', err);
    process.exit(1);
  }
  console.log(`gRPC server is running on port ${port}`);

  server.start();
});

export default app;
