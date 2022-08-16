import { Document, Schema, model, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";

//An interface that describes the properties required to create a new User
interface QuizAttrs {
  author: string;
  title: string;
  isPublished: boolean;
}

//An interface that describes the properties that a User Document has
interface QuizDoc extends Document {
  author: string;
  title: string;
  isPublished: boolean;
  updatedAt?: Date;
}
//An interface that describes the properties that a User Model has
interface QuizModel extends PaginateModel<QuizDoc> {
  build(attrs: QuizAttrs): QuizDoc;
}

const QuizSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
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

QuizSchema.statics.build = (attrs: QuizAttrs) => {
  return new Quiz(attrs);
};
QuizSchema.plugin(paginate);

const Quiz = model<QuizDoc, QuizModel>("Quiz", QuizSchema);

export { Quiz };
