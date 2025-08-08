import { LongText, ShortText, StellarForm } from ".";

const name: ShortText = {
  id: "name",
  type: "SHORT_TEXT",
  label: "이름",
  required: true,
};

const phoneNumber: ShortText = {
  id: "phoneNumber",
  type: "SHORT_TEXT",
  label: "전화번호",
  required: true,
};

const email: ShortText = {
  id: "email",
  type: "SHORT_TEXT",
  label: "이메일",
  required: true,
};

const inquiryTitle: ShortText = {
  id: "inquiryTitle",
  type: "SHORT_TEXT",
  label: "문의 제목",
  required: true,
};

const inquiryContent: LongText = {
  id: "inquiryContent",
  type: "LONG_TEXT",
  label: "문의 내용",
  required: true,
};

export const inquiryFormTemplate: StellarForm = {
  id: "inquiryForm",
  title: "상담 문의",
  fields: [name, phoneNumber, email, inquiryTitle, inquiryContent],
};
