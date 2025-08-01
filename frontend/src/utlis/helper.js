export const catchError = (error) => {
  const { response } = error;
  if (response) {
    const { status, data } = response;
    if (typeof data === "string" && data.trim().startsWith("<!DOCTYPE html>")) {
      return {
        message: `Unexpected HTML response received. Status: ${status}.`,
        success: false,
      };
    }
    if (data) {
      return {
        message: data.message || "An error occurred.",
        success: false,
        data,
      };
    }
    return {
      message: `Request failed with status code ${status}.`,
      success: false,
    };
  }
  return {
    message: error.message || "An unknown error occurred.",
    success: false,
  };
};