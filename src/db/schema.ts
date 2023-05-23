import {
  boolean,
  date,
  index,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { InferModel, relations } from 'drizzle-orm';
import { MapLocation } from '~/db/types';

// User -----------------------------------------------------
export const users = mysqlTable('users', {
  id: varchar('id', { length: 100 }).primaryKey(),
  nickName: varchar('nick_name', { length: 40 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type User = InferModel<typeof users>;
export type CreateUser = InferModel<typeof users, 'insert'>;

export const usersRelations = relations(users, ({ many }) => ({
  questions: many(questions),
  answers: many(answers),
}));

// City -----------------------------------------------------
export const cities = mysqlTable('cities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  previewImageUrl: varchar('preview_image_url', { length: 250 }),
  centerPoint: json('center_point')
    .$type<MapLocation>()
    .notNull()
    .default({ lat: 49.21866559856739, lng: 15.880347529353775 }),
  mapZoom: int('map_zoom').notNull().default(14),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type City = InferModel<typeof cities>;

export const citiesRelations = relations(cities, ({ many }) => ({
  tournaments: many(tournaments),
  questions: many(questions),
}));

// Tournament -----------------------------------------------------
export const tournaments = mysqlTable('tournaments', {
  id: varchar('id', { length: 100 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  startDate: date('start_date'),
  endDate: date('end_date'),
  cityId: int('city_id').notNull(),
});

export const tournamentsRelations = relations(tournaments, ({ one, many }) => ({
  city: one(cities, { fields: [tournaments.cityId], references: [cities.id] }),
  questions: many(questions),
}));

// Question -----------------------------------------------------
export const questions = mysqlTable(
  'questions',
  {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 250 }).notNull(),
    questionDescription: text('question_description'),
    answerDescription: text('answer_description'),
    authorId: varchar('author_id', { length: 100 }).notNull(),
    questionImageUrl: varchar('question_image_url', { length: 250 }).notNull(),
    answerImagesUrl: text('answer_images_url').notNull(),
    cityId: int('city_id'),
    tournamentId: varchar('tournament_id', { length: 100 }),
    roundOrder: int('round_order'),
    startDate: timestamp('start_date'),
    endDate: timestamp('end_date'),
    location: json('location').$type<MapLocation>().notNull(),
    demo: boolean('demo').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    roundOrderIdx: index('round_order_idx').on(table.roundOrder, table.tournamentId),
  }),
);

export type Question = InferModel<typeof questions>;

export const questionsRelations = relations(questions, ({ one, many }) => ({
  city: one(cities, { fields: [questions.cityId], references: [cities.id] }),
  tournament: one(tournaments, {
    fields: [questions.tournamentId],
    references: [tournaments.id],
  }),
  author: one(users, { fields: [questions.authorId], references: [users.id] }),
  answers: many(answers),
}));

// Answer -----------------------------------------------------
export const answers = mysqlTable('answers', {
  id: serial('id').primaryKey(),
  location: json('location').$type<MapLocation>().notNull(),
  score: int('score').notNull(),
  medal: mysqlEnum('medal', ['GOLD', 'SILVER', 'BRONZE']),
  questionId: int('question_id').notNull(),
  userId: varchar('user_id', { length: 100 }).notNull(),
  answeredAt: timestamp('answered_at').notNull(),
});

export type Answer = InferModel<typeof answers>;
export type CreateAnswer = InferModel<typeof answers, 'insert'>;

export const answersRelations = relations(answers, ({ one }) => ({
  question: one(questions, { fields: [answers.questionId], references: [questions.id] }),
  user: one(users, { fields: [answers.userId], references: [users.id] }),
}));
