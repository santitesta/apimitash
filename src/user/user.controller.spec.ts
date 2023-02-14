import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import config from '@app/ormconfig';

describe('UserController', () => {
  let userController: UserController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [
        TypeOrmModule.forRoot(config),
        TypeOrmModule.forFeature([UserEntity]),
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should have a createUser function', () => {
    expect(typeof userController.createUser).toBe('function');
  });
});
