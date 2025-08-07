import { Form, LongText, ShortText } from ".";

const name: ShortText = {
  id: "name",
  label: "이름",
  required: true,
  type: "SHORT_TEXT",
  minLength: 2,
  maxLength: 20,
};

const phoneNumber: ShortText = {
  id: "phoneNumber",
  label: "전화번호",
  required: true,
  type: "SHORT_TEXT",
  minLength: 10,
  maxLength: 15,
};

const email: ShortText = {
  id: "email",
  label: "이메일",
  required: true,
  type: "SHORT_TEXT",
  minLength: 5,
  maxLength: 50,
};

const inquiryTitle: ShortText = {
  id: "inquiryTitle",
  label: "문의 제목",
  required: true,
  type: "SHORT_TEXT",
  minLength: 5,
  maxLength: 100,
};

const inquiryContent: LongText = {
  id: "inquiryContent",
  label: "문의 내용",
  required: true,
  type: "LONG_TEXT",
  minLength: 10,
  maxLength: 1000,
};

export const inquiryFormTemplate: Form = {
  id: "inquiryForm",
  title: "상담 문의",
  fields: [name, phoneNumber, email, inquiryTitle, inquiryContent],
};
