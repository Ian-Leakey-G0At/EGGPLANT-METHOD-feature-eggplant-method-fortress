
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  render,
} from '@react-email/components';
import * as React from 'react';

interface AccessEmailProps {
  accessUrl: string;
  courseTitle: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const AccessEmail = ({
  accessUrl,
  courseTitle,
}: AccessEmailProps) => (
  <Html>
    <Head />
    <Preview>Your access to {courseTitle}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/static/logo.png`}
          width="150"
          height="50"
          alt="Course Logo"
          style={logo}
        />
        <Text style={paragraph}>Hi there,</Text>
        <Text style={paragraph}>
          Thank you for your purchase. You can now access your course content
          by clicking the button below.
        </Text>
        
        <Text style={recommendation}>
          <strong>Recommendation:</strong> Bookmark the link below or save this email. This is your personal, durable key for accessing the course for the next 365 days.
        </Text>

        <Section style={btnContainer}>
          <Button style={button} href={accessUrl}>
            Access Course
          </Button>
        </Section>
        <Text style={paragraph}>
          If you have any questions, please don't hesitate to contact us.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          This is an automated email. Please do not reply.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default AccessEmail;

const main = {
  backgroundColor: '#0f172a', // slate-900
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  color: '#cbd5e1' // slate-300
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  margin: '0 auto',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#cbd5e1' // slate-300
};

const recommendation = {
    ...paragraph,
    padding: '12px',
    backgroundColor: '#1e293b', // slate-800
    borderLeft: '4px solid #f59e0b', // amber-500
    borderRadius: '4px',
}

const btnContainer = {
  textAlign: 'center' as const,
  margin: '24px 0'
};

const button = {
  backgroundColor: '#f59e0b', // amber-500
  borderRadius: '6px',
  color: '#0f172a', // slate-900
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const hr = {
  borderColor: '#334155', // slate-700
  margin: '20px 0',
};

const footer = {
  color: '#64748b', // slate-500
  fontSize: '12px',
  lineHeight: '24px',
};
