export default function addAuthHeader(otherHeaders = {}) {
  const token = localStorage.getItem("token"); // Retrieve token from local storage
  if (!token || token === "INVALID_TOKEN") {
    return otherHeaders;
  } else {
    return {
      ...otherHeaders,
      Authorization: `Bearer ${token}`,
    };
  }
}
