import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Question,
  QuestionProps,
} from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityId(),
    title: "Example title",
    content: "Example Content",
    slug: Slug.create("example-title"),
    ...override,
  });

  return question;
}
