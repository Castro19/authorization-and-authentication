import addAuthHeader from "@/security/authHeader";
import { MessageType } from "@/types";

type updateSecretType = {
  userId: string;
  secretId: string;
  title: string;
  description: string;
};
export default async function updateSecret(
  secret: updateSecretType
): Promise<MessageType> {
  const options = {
    method: "PUT",
    headers: addAuthHeader({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      userId: secret.userId,
      title: secret.title,
      description: secret.description,
    }),
  };
  console.log("Opt: ", options);
  const response = await fetch(
    `http://localhost:4000/secrets/${secret.secretId}`,
    options
  );
  if (!response.ok) {
    const errorData = await response.json();
    console.log(`Error with updating secret: ${errorData}`);
    return errorData;
  }
  const responseData = await response.json();
  console.log("Response Data: ", responseData);
  return responseData;
}
