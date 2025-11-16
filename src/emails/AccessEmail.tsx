import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  render,
} from "@react-email/components";
import * as React from "react";

interface AccessEmailProps {
  accessUrl: string;
}

export const AccessEmail = ({ accessUrl }: AccessEmailProps) => (
  <Html>
    <Head />
    <Preview>Your method is unlocked</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section>
          <Text style={title}>Method</Text>
          <Text style={paragraph}>
            Your access to the Viral 2 Step Method is now unlocked. Use the
            link below to view the private video.
          </Text>
          <Text style={paragraph}>
            This link is unique to you and will be valid for 365 days. Do not share it.
          </Text>
          <Button style={button} href={accessUrl}>
            Access Your Video
          </Button>
          <Text style={footer}>
            You received this email because you purchased the method from our
            official vendor.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);


// Styles
const main = {
  backgroundColor: "#111111",
  fontFamily: 'Inter, sans-serif',
  color: "#d4d4d4",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const title = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#84CC16",
  borderRadius: "8px",
  color: "#111111",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "12px",
};

const footer = {
  color: "#6b7280",
  fontSize: "12px",
  marginTop: "24px",
}
