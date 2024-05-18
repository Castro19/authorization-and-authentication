import addAuthHeader from "@/security/authHeader";

async function fetchPermissions(secretId: string) {
  const options = {
    headers: addAuthHeader({
      "Content-Type": "application/json",
    }),
  };
  console.log("Permission Options for Request: ", options);
  try {
    const response = await fetch(
      `http://localhost:4000/permissions/${secretId}`,
      options
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.log(`Error: `, errorData);
      throw new Error("" + errorData.message);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(`Error: `, error);
  }
}

export default fetchPermissions;
