import mongoose from "mongoose"
export const DB_CONNECT = "Your Mongo Url"
export const JWT_TOKEN_SECRET="ANY secret"
export const StatusCode={
    SUCCESS:200,
    VALIDATION_ERROR:201,
    UPROCESSABLE_ENTITY:202,
    AUTH_ERROR:203
}
mongoose.connect(DB_CONNECT, {
    connectTimeoutMS: 30000
  });