import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "../../enterprise/entities/answer";

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

interface AnswerQuestionUseCaseResponse {
  answer: Answer;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.answersRepository.create(answer);
    return { answer };
  }
}
