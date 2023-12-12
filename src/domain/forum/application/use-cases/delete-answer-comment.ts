import { Either, left, right } from "@/core/either";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentUseCaseRequest {
  AnswerCommentId: string;
  authorId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<string, {}>;

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
      return left("Answer comment not found.");
    }

    if (comment.authorId.toString() !== authorId) {
      return left("Not allowed.");
    }

    await this.AnswerCommentsRepository.delete(comment);

    return right({});
  }
}
