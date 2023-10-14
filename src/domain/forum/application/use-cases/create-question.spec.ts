import { Question } from "../../enterprise/entities/question";
import { CreateQuestionUseCase } from "./create-question";
import { QuestionsRepository } from "../repositories/questions-repository";

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) => {
    return;
  },
};

test("Create an question", async () => {
  const questionsRepository = new CreateQuestionUseCase(
    fakeQuestionsRepository
  );

  const { question } = await questionsRepository.execute({
    authorId: "1",
    title: "title of question",
    content: "content of question",
  });

  expect(question.id).toBeTruthy();
});
