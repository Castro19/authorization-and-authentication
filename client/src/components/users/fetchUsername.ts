export default async function fetchUserName(userId: string) {
  console.log("user id in fetch: ", userId);
  try {
    const response = await fetch(
      `http://localhost:4000/users/username?userid=${userId}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.log(`Error Fetching username: ${errorData});
      }`);
      throw new Error("Error: " + errorData.message);
    }
    const responseData = await response.json();
    console.log("Response Data: ", responseData);
    return responseData;
  } catch (error) {
    console.log(`Error: `, error);
    return null;
  }
}
