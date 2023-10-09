import sgMail from '@sendgrid/mail';

export interface EmailProps {
  email: string;
  subject: string;
  html: any;
}

export const sendEmail = async ({ email, subject, html }: EmailProps) => {

  try {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM,
      subject: subject,
      html: html,
    } as any;

    await sgMail.send(msg);

    return true;

  } catch (error) {

    return false;

  }

};