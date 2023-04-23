import {
  boolean,
  datetime,
  int,
  json,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { InferModel } from 'drizzle-orm';

// User
export const users = mysqlTable('users', {
  id: varchar('id', { length: 100 }).primaryKey(),
  nickName: varchar('nick_name', { length: 40 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type User = InferModel<typeof users>;
export type CreateUser = InferModel<typeof users, 'insert'>;

// Tournament
export const tournaments = mysqlTable('tournaments', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  cityId: int('city_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// City
export const cities = mysqlTable('cities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  previewImageUrl: varchar('preview_image_url', { length: 250 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type City = InferModel<typeof cities>;

// Question
export const questions = mysqlTable('questions', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 250 }).notNull(),
  questionDescription: text('question_description'),
  answerDescription: text('answer_description'),
  authorId: varchar('author_id', { length: 100 }).notNull(),
  imageUrl: varchar('image', { length: 250 }).notNull(),
  cityId: int('city_id'),
  tournamentId: int('tournament_id'),
  startDate: datetime('start_date'),
  endDate: datetime('end_date'),
  location: json('location').$type<Location>().notNull(),
  demo: boolean('demo').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export interface Location {
  lat: number;
  lng: number;
}

export type Question = InferModel<typeof questions>;

// Answer
export const answers = mysqlTable('answers', {
  id: serial('id').primaryKey(),
  location: json('location').$type<Location>().notNull(),
  score: int('score').notNull(),
  questionId: int('question_id').notNull(),
  userId: varchar('user_id', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Answer = InferModel<typeof answers>;
export type CreateAnswer = InferModel<typeof answers, 'insert'>;
