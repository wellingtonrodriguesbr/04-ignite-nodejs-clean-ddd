import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { PaginationParams } from "@/core/repositories/pagination-params";
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

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      })
      .slice((page - 1) * 20, page * 20);

    return questions;
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
