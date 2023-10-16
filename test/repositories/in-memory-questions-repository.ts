import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  async create(question: Question) {
    this.items.push(question);
  }

  async save(question: Question) {
    const questionIndex = this.items.findIndex((q) => q.id === question.id);
    this.items[questionIndex] = question;
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug);

    if (!question) {
      return null;
    }

    return question;
  }

  async findById(questionId: string) {
    const question = this.items.find(
      (item) => item.id.toString() === questionId
    );

    if (!question) {
      return null;
    }

    return question;
  }

  async delete(question: Question) {
    const questionIndex = this.items.findIndex((q) => q.id === question.id);
    this.items.splice(questionIndex, 1);
  }
}
