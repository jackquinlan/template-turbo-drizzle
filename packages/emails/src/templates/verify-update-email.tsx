import { Html, Head, Preview, Body } from "@react-email/components";

export function VerifyUpdateEmailTemplate(verificationLink: string) {
  return (
    <Html>
      <Head>
        <Preview>Before continuing, please verify your email</Preview>
        <Body>
          Hey 👋,
          <br />
          <br />
          We have recieved a request to update your email address. To verify
          your new email address, click the button below 👇.
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
