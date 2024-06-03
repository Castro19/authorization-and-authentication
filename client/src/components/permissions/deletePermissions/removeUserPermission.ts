import addAuthHeader from "@/security/authHeader";
import { MessageType } from "@/types";

async function removeUserPermission(
  userId: string,
  secretId: string
): Promise<MessageType> {
  const options = {
    method: "DELETE",
    headers: addAuthHeader({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      userId,
      secretId,
    }),
  };
  console.log("Permission Options for Request: ", options);
  const response = await fetch(`http://localhost:4000/permissions`, options);
  if (!response.ok) {
    const errorData: MessageType = await response.json();
    console.log(`Error: `, errorData);
    return errorData;
  }
  const responseData = await response.json();
  return responseData;
}

export default removeUserPermission;
