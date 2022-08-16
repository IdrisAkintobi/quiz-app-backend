import { Document, Schema, model, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";

//An interface that describes the properties required to create a new User
interface QuizSolutionAttrs {
  author: string;
  user: string;
  quiz: string;
  solutions: Record<string, number>;
  percentage: string;
  updatedAt?: Date;
}

//An interface that describes the properties that a User Document has
interface QuizSolutionDoc extends Document {
  author: string;
  user: string;
  quiz: string;
  solutions: Record<string, number>;
  percentage: string;
}
//An interface that describes the properties that a User Model has
interface QuizSolutionModel extends PaginateModel<QuizSolutionDoc> {
  build(attrs: QuizSolutionAttrs): QuizSolutionDoc;
}

const quizSolution = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    solutions: {
      type: Object,
      required: true,
    },
    percentage: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

quizSolution.statics.build = (attrs: QuizSolutionAttrs) => {
  return new QuizSolution(attrs);
};

quizSolution.plugin(paginate);

const QuizSolution = model<QuizSolutionDoc, QuizSolutionModel>(
  "QuizSolution",
  quizSolution
);

export { QuizSolution };
