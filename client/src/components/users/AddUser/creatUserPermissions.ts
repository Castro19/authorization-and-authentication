import addAuthHeader from "@/security/authHeader";
export default async function createUserPermissions(
  userId: string,
  secretId: string,
  roles: string[]
) {
  const options = {
    method: "POST",
    headers: addAuthHeader({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      userId,
      secretId,
      roles,
    }),
  };
  console.log("Permission Options for Request: ", options);
  try {
    const response = await fetch(`http://localhost:4000/permissions`, options);
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
