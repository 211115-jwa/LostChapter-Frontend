import { User } from "./User";

export interface Review {
    review: {
        reviewId: String,
        book: String,
        User: User,
        reviewTitle: String,
        reviewContent: String
    }[];
}
