import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentUseCaseRequest {
  questionCommentId: string;
  authorId: string;
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const comment = await this.questionCommentsRepository.findById(
      questionCommentId
    );

    if (!comment) {
      throw new Error("Question comment not found.");
    }

    if (comment.authorId.toString() !== authorId) {
      throw new Error("Not allowed.");
    }

    await this.questionCommentsRepository.delete(comment);

    return {};
  }
}
