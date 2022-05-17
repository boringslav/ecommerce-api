import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { RepositoryService } from '../../../repository/repository.service';

describe('ProductService Integration', () => {
  beforeAll(async () => {
    let repository: RepositoryService;

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // eslint-disable-next-line prefer-const
    repository = moduleRef.get(RepositoryService);
    // await repository.cleanDatabase();
  });
  it.todo('Should pass');
});
