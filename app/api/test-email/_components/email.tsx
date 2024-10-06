import * as React from "react";
import {
  Html,
  Button,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Row,
  Column,
  Heading,
  Img,
  Tailwind,
  Text,
  Link,
  Hr,
} from "@react-email/components";
import EditorJSParser from "editorjs-parser";
import { Chapter, Course } from "@prisma/client";
import { customParsers } from "@/lib/editorjs-to-html";
interface EmailProps {
  content: any;
  course: Course;
  chapter: Chapter;
}
const parser = new EditorJSParser(undefined, customParsers);
export function Email({ content, course, chapter }: EmailProps) {
  //   const { url } = props;
  let headerContent;
  if (course.headerJson) {
    headerContent = parser.parse(course.headerJson);
  }

  let footerContent;
  if (course.footerJson) {
    footerContent = parser.parse(course.footerJson);
  }

  return (
    <Html lang="en">
      <Head />
      {chapter?.previewText ? (
        <Preview>{chapter?.previewText}</Preview>
      ) : (
        <Preview>{chapter?.title}</Preview>
      )}
      <Tailwind>
        <Body style={main}>
          <Container className=" px-10" style={container}>
            <Section style={header}>
              <Row>
                <Column>
                  {/* <Heading > */}
                  {course?.pinterest ? (
                    <Img
                      className=" object-contain"
                      width={600}
                      height={200}
                      src={course.pinterest}
                    />
                  ) : (
                    ""
                  )}
                  {/* </Heading> */}
                </Column>

                {/* <Column style={headerImageContainer}></Column> */}
              </Row>
              <Row>
                <Column>
                  <Heading className="text-lg font-semibold" style={heading}>
                    <div dangerouslySetInnerHTML={{ __html: headerContent }} />
                  </Heading>
                </Column>
              </Row>
            </Section>

            
            
            

            <Section>
              <div dangerouslySetInnerHTML={{ __html: content }} />
              <Hr />
            </Section>

            <Section style={footer}>
              <Row>
                <Column>
                  <Heading className="text-lg font-semibold" style={heading}>
                    <div dangerouslySetInnerHTML={{ __html: footerContent }} />
                  </Heading>
                </Column>
              </Row>
            </Section>

            <Section className="flex gap-2 text-center">
            <Button
            className="px-3 py-2"
              href=""
            >
              Get next chapter
            </Button>
            <Button
              href=""
               className="px-3 py-2 bg-red-400" 
            >
              Change schedule
            </Button>
            <Button
              href=""
               className="px-3 py-2"
            >
              Pause course
            </Button>
            </Section>

            <Section>
              <Heading className="  font-semibold text-center">
                Create email courses with Rainbox
              </Heading>
            </Section>
          </Container>
          <Section style={footer}>
            <Text>
              Youre receiving this email because your subscribed for this course
              on Rainbox.
            </Text>
            <Link href="/" style={footerLink}>
              Unsubscribe from emails like this{" "}
            </Link>
            <Link href="/" style={footerLink}>
              Edit email settings{" "}
            </Link>
            <Link href="/" style={footerLink}>
              Contact us
            </Link>
            <Link href="/" style={footerLink}>
              Privacy
            </Link>

            {/* <Hr style={footerDivider} />

            {/* <Img width={111} src={`${baseUrl}/static/stack-overflow-logo-sm.png`} /> */}
            <Text style={footerAddress}>
              <strong>Rainbox</strong>, 110 William Street, 28th Floor, New
              York, NY 10038
            </Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}
const main = {
  backgroundColor: "#f3f3f5",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
};
export default Email;

const title = {
  margin: "0 0 15px",
  fontWeight: "bold",
  fontSize: "21px",
  lineHeight: "21px",
  color: "#0c0d0e",
};

const paragraph = {
  fontSize: "15px",
  lineHeight: "21px",
  color: "#3c3f44",
};

const divider = {
  margin: "30px 0",
};

const container = {
  width: "600px",
  maxWidth: "100%",
  margin: "0 auto",
  backgroundColor: "#ffffff",
};

const footer = {
  width: "680px",
  maxWidth: "100%",
  margin: "32px auto 0 auto",
  padding: "0 30px",
};

const content = {
  padding: "30px 30px 40px 30px",
};

const logo = {
  display: "flex",
  background: "#f3f3f5",
  padding: "20px 30px",
};

const header = {
  borderRadius: "5px 5px 0 0",
  display: "flex",
  flexDireciont: "column",
  //   backgroundColor: '#2b2d6e',
};

const buttonContainer = {
  marginTop: "24px",
  display: "block",
};

const button = {
  backgroundColor: "#0095ff",
  border: "1px solid #0077cc",
  fontSize: "17px",
  lineHeight: "17px",
  padding: "13px 17px",
  borderRadius: "4px",
  maxWidth: "120px",
  color: "#fff",
};

const footerDivider = {
  ...divider,
  borderColor: "#d6d8db",
};

const footerText = {
  fontSize: "12px",
  lineHeight: "15px",
  color: "#9199a1",
  margin: "0",
};

const footerLink = {
  display: "inline-block",
  color: "#9199a1",
  textDecoration: "underline",
  fontSize: "12px",
  marginRight: "10px",
  marginBottom: "0",
  marginTop: "8px",
};

const footerAddress = {
  margin: "4px 0",
  fontSize: "12px",
  lineHeight: "15px",
  color: "#9199a1",
};

const footerHeart = {
  borderRadius: "1px",
  border: "1px solid #d6d9dc",
  padding: "4px 6px 3px 6px",
  fontSize: "11px",
  lineHeight: "11px",
  fontFamily: "Consolas,monospace",
  color: "#e06c77",
  maxWidth: "min-content",
  margin: "0 0 32px 0",
};
const heading = {
  padding: "10px",
  color: "#191919",
  fontWeight: "400",
  fontSize: " 28px",
  marginBottom: "0",
};
