import { AnswerQuestionUseCase } from "./answer-question";
import { AnswersRepository } from "../repositories/answers-repository";
import { Answer } from "../../enterprise/entities/answer";

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return;
  },
};

test("Create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const { answer } = await answerQuestion.execute({
    instructorId: "1",
    questionId: "1",
    content: "New Answer",
  });

  expect(answer.content).toEqual("New Answer");
});
