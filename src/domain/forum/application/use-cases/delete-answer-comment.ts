import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentUseCaseRequest {
  AnswerCommentId: string;
  authorId: string;
}

interface DeleteAnswerCommentUseCaseResponse {}

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
      throw new Error("Answer comment not found.");
    }

    if (comment.authorId.toString() !== authorId) {
      throw new Error("Not allowed.");
    }

    await this.AnswerCommentsRepository.delete(comment);

    return {};
  }
}
