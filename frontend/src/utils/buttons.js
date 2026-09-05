/**
 * Returns status label and available actions based on the book's current status.
 *
 * @param {string} status - One of: "not user book", "want_to_read", "current_reading", "completed"
 * @returns {{ statusLabel: string, actions: Array<{ label: string, value: string, variant: string }> }}
 */
const getBookActions = (status) => {
  switch (status) {
    case "want_to_read":
      return {
        statusLabel: "Want to Read",
        statusVariant: "info",
        actions: [
          {
            label: "Move to Currently Reading",
            value: "current_reading",
            variant: "primary",
          },
          {
            label: "Remove from List",
            value: "remove",
            variant: "danger",
          },
        ],
      };

    case "current_reading":
      return {
        statusLabel: "Currently Reading",
        statusVariant: "warning",
        actions: [
          {
            label: "Move to Completed",
            value: "completed",
            variant: "success",
          },
          {
            label: "Remove from List",
            value: "remove",
            variant: "danger",
          },
        ],
      };

    case "completed":
      return {
        statusLabel: "Completed",
        statusVariant: "success",
        actions: [
          {
            label: "Remove from List",
            value: "remove",
            variant: "danger",
          },
        ],
      };

    default:
      // "not user book" or any unknown status
      return {
        statusLabel: "Not in your library",
        statusVariant: "neutral",
        actions: [
          {
            label: "Want to Read",
            value: "want_to_read",
            variant: "primary",
          },
        ],
      };
  }
};

export default getBookActions;
