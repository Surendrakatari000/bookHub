const list = [
  "move to want to read",
  "move to current reading",
  "move to completed",
  "remove from list",
];

const statusValues = ["want_to_read", "current_reading", "completed"];

const originalStatus = (selectedValue) => {
  let originalValue = "";

  switch (selectedValue) {
    case list[0]:
      originalValue = statusValues[0];
      break;

    case list[1]:
      originalValue = statusValues[1];
      break;

    case list[2]:
      originalValue = statusValues[2];
      break;

    default:
      originalValue = "remove";
  }

  return originalValue;
};

export default originalStatus;
