import { Test } from '@nestjs/testing';
import { TasksRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
});

const mockUser = {
  username: 'Nico',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: TasksRepository;

  beforeEach(async () => {
    // initialize a NestJS module with taskService and tasksRepository to test in isolation.
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', () => {
      expect(tasksRepository.getTasks).not.toHaveBeenCalled();
      // call tasksService.getTasks, which should then call the repository's getTasks
      tasksService.getTasks(null, mockUser);
      expect(tasksRepository.getTasks).toHaveBeenCalled();
    });
  });
});
