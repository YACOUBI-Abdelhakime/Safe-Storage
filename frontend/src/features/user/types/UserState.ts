import { User } from "./User";

export interface UserState {
  user: User | null;
  isLoading: boolean;
}
