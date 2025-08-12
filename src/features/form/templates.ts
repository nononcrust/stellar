import { Email, LongText, PhoneNumber, ShortText, StellarForm } from "./schema";

const name: ShortText = {
  id: "name",
  type: "SHORT_TEXT",
  label: "이름",
  description: "",
  required: true,
};

const phoneNumber: PhoneNumber = {
  id: "phoneNumber",
  type: "PHONE_NUMBER",
  label: "전화번호",
  description: "",
  required: true,
};

const email: Email = {
  id: "email",
  type: "EMAIL",
  label: "이메일",
  description: "",
  required: true,
};

const inquiryTitle: ShortText = {
  id: "inquiryTitle",
  type: "SHORT_TEXT",
  label: "문의 제목",
  description: "",
  required: true,
};

const inquiryContent: LongText = {
  id: "inquiryContent",
  type: "LONG_TEXT",
  label: "문의 내용",
  description: "",
  required: true,
};

export const inquiryFormTemplate: StellarForm = {
  id: "inquiryForm",
  title: "상담 문의",
  fields: [name, phoneNumber, email, inquiryTitle, inquiryContent],
};
