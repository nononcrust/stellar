export const formatToNumberOnly = (value: string) => {
  return value.replace(/[^0-9]/g, "");
};

export const formatToPhoneNumber = (value: string) => {
  if (value.length < 4) {
    return value;
  }

  if (value.length < 8) {
    return `${value.slice(0, 3)}-${value.slice(3)}`;
  }

  return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
};
