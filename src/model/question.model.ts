import { Model, Document, Schema, model, SchemaType } from "mongoose";

//An interface that describes the properties required to create a new User
interface QuestionAttrs {
  quiz: string;
  question: string;
  options: string[];
  answer: string[];
  type: "singleAns" | "multipleAns";
}

//An interface that describes the properties that a User Document has
interface QuestionDoc extends Document {
  quiz: string;
  question: string;
  options: string[];
  answer: string[];
  type: "singleAns" | "multipleAns";
}
//An interface that describes the properties that a User Model has
interface UserModel extends Model<QuestionDoc> {
  build(attrs: QuestionAttrs): QuestionDoc;
}

const questionSchema = new Schema(
  {
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: arrLimit,
        message: "Options must be between 1 and 5",
      },
    },
    answer: {
      type: [String],
      required: true,
      validate: {
        validator: arrLimit,
        message: "Answers must be between 1 and 5",
      },
    },
    type: {
      type: String,
      required: true,
      enum: ["singleAns", "multipleAns"],
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

questionSchema.statics.build = (attrs: QuestionAttrs) => {
  return new Question(attrs);
};

function arrLimit(val: []) {
  return val.length >= 1 && val.length <= 5;
}

const Question = model<QuestionDoc, UserModel>("Question", questionSchema);

export { Question };
