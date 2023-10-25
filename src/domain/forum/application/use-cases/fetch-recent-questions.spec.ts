import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe("Fetch Recent Questions", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to fetch recent questions", async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2023, 9, 21),
      })
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2023, 9, 12),
      })
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2023, 9, 22),
      })
    );

    const { questions } = await sut.execute({ page: 1 });

    expect(questions).toEqual([
      expect.objectContaining({
        createdAt: new Date(2023, 9, 22),
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 9, 21),
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 9, 12),
      }),
    ]);
  });

  it("should be able to fetch paginated recent questions", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion());
    }

    const { questions } = await sut.execute({ page: 2 });

    expect(questions).toHaveLength(2);
  });
});