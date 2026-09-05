const detailedBookButton = (statusbutton) => {
  const buttonObject = {
    zero: "",
    first: "",
    second: "",
    third: "",
  };

  const list = [
    "move to want to read",
    "move to current reading",
    "move to completed",
    "remove from list",
  ];

  switch (statusbutton) {
    case "want_to_read":
      buttonObject.first = list[1];
      buttonObject.second = list[2];
      buttonObject.third = list[3];
      buttonObject.zero = "Want to read";
      break;

    case "current_reading":
      buttonObject.first = list[2];
      buttonObject.second = list[0];
      buttonObject.third = list[3];
      buttonObject.zero = "Current reading";
      break;
    case "completed":
      buttonObject.first = list[0];
      buttonObject.second = list[1];
      buttonObject.third = list[3];
      buttonObject.zero = "Completed";
      break;

    default:
      buttonObject.first = list[0];
      buttonObject.second = list[1];
      buttonObject.third = list[2];
  }
  return buttonObject;
};

export default detailedBookButton;
