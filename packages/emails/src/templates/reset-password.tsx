import { Html, Head, Preview, Body } from "@react-email/components";

export function ResetPasswordTemplate(resetLink: string) {
  return (
    <Html>
      <Head>
        <Preview>
          We have recieved a request to reset your password for your account
        </Preview>
        <Body>
          Hey 👋,
          <br />
          <br />
          We have recieved a request to reset your password for your account.
          <br />
          If it was you, you can reset your password by clicking the button
          below 👇.
          <br />
          <br />
          <a href={resetLink}>Reset your password</a>
          <br />
          <br />
          This token is only valid for the next 1 hour.
          <br />
          If this wasn't you, please ignore this email or reach out to support
          for more assistance.
          <br />
          To keep your account secure, please don't forward this email to
          anyone.
          <br />
          <br />
          Thanks,
          <br />
          Acme Inc. Team
        </Body>
      </Head>
    </Html>
  );
}
