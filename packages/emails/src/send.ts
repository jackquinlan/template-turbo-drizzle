import type React from "react";
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export interface IEmail {
  react: React.JSX.Element;
  subject: string;
  to: string[];
  from: string;
}

export async function sendEmail(email: IEmail) {
  return resend.emails.send({
    ...email,
  });
}
