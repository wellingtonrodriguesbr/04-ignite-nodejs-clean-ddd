import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { EditAnswerUseCase } from "./edit-answer";
import { makeAnswer } from "test/factories/make-answer";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to edit a answer", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId("author-1"),
      },
      new UniqueEntityId("answer-1")
    );
    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId: "answer-1",
      authorId: "author-1",
      content: "Update Content",
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "Update Content",
    });
  });

  it("should not be able to edit a answer from another author", async () => {
    const newQuestion = makeAnswer(
      {
        authorId: new UniqueEntityId("author-1"),
      },
      new UniqueEntityId("answer-1")
    );
    await inMemoryAnswersRepository.create(newQuestion);

    const result = await sut.execute({
      answerId: "answer-1",
      authorId: "author-2",
      content: "Update Content",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
