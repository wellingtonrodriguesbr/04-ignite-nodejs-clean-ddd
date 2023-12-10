import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { makeAnswerComment } from "test/factories/make-answer-comment";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete Answer Comment", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  it("should be able to delete a comment from a Answer", async () => {
    const newComment = makeAnswerComment();
    await inMemoryAnswerCommentsRepository.create(newComment);

    await sut.execute({
      AnswerCommentId: newComment.id.toString(),
      authorId: newComment.authorId.toString(),
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a comment from another user", async () => {
    const newComment = makeAnswerComment({
      authorId: new UniqueEntityId("author-1"),
    });
    await inMemoryAnswerCommentsRepository.create(newComment);

    expect(() => {
      return sut.execute({
        AnswerCommentId: newComment.id.toString(),
        authorId: "author-2",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
