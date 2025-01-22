import { Html, Head, Preview, Body } from "@react-email/components";

export function VerifyEmailTemplate(verificationLink: string) {
  return (
    <Html>
      <Head>
        <title>Welcome to Acme Inc!</title>
        <Preview>Before logging in, please verify your email</Preview>
        <Body>
          Hey 👋,
          <br />
          <br />
          Before you get started, please verify your email address by clicking
          the button below 👇.
          <br />
          <br />
          <a href={verificationLink}>Verify your email</a>
          <br />
          <br />
          This token is only valid for the next 1 hour.
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
