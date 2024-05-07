// Function to retrieve either userId or userName based on provided information
// Function to retrieve either userId or userName based on provided information
export default async function getUserInfo(
  identifier: string,
  returnType: string
) {
  const endpoint = returnType === "userId" ? "get-user-id" : "get-user-name";
  const parameter =
    returnType === "userId" ? `username=${identifier}` : `userid=${identifier}`;

  try {
    const response = await fetch(
      `http://localhost:4000/users/${endpoint}?${parameter}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error getting user information: ${errorData.message}`);
    }
    const data = await response.json();
    console.log("Response Data: ", data);
    return data; // This could be either userId or userName based on the returnType
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error; // Rethrow to let the caller handle it
  }
}
