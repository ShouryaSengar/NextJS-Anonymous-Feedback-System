import mongoose, { Schema, Document } from "mongoose";

//mongooes properties start with Capital Letter

/*
 * Interface (Message) defines the TypeScript type for the data.
 * It helps maintain type safety and provides IntelliSense support during development.
 */

/*
 * Schema (MessageSchema) defines the structure and constraints for storing that data in MongoDB. 
 * It helps enforce data integrity and consistency within the database.
 */

// ! MESSAGE
//Defines an interface named Message that specifies the structure of data to be stored in MongoDB.
export interface Message extends Document {
    content: string;
    createdAt: Date;
}
//MessageSchema is a Mongoose schema for documents conforming to the Message interface. It defines two fields: content and createdAt.
const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// ! USER
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true, //Eliminates spaces in username, if provided by user
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please use a valid Email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verification Code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verification Code Expiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema] //Unique
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema))

/*
 * The code snippet ensures that UserModel is a valid Mongoose model (mongoose.Model<User>) for working with documents conforming to the User interface.
 * If the User model already exists (mongoose.models.User is not undefined), it is cast to the appropriate TypeScript type (mongoose.Model<User>).
 * If the User model does not exist, a new model is created with the name "User" and the provided schema (UserSchema), 
 * ensuring that UserModel is properly defined and ready to interact with MongoDB for User documents.
 */