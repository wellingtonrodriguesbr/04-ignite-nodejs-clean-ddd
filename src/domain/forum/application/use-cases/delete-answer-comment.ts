import { Either, left, right } from "@/core/either";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface DeleteAnswerCommentUseCaseRequest {
  AnswerCommentId: string;
  authorId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteAnswerCommentUseCase {
  constructor(private AnswerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    AnswerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const comment = await this.AnswerCommentsRepository.findById(
      AnswerCommentId
    );

    if (!comment) {
      return left(new ResourceNotFoundError());
    }

    if (comment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.AnswerCommentsRepository.delete(comment);

    return right({});
  }
}
