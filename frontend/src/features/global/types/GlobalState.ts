import { AlertType } from "./AlertType";

export interface GlobalState {
  message: string | null;
  type: AlertType | null;
}
