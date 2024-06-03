import addAuthHeader from "@/security/authHeader";

export default async function deleteSecret(userId: string, secretId: string) {
  console.log("USER IDD: ", userId);
  console.log("SECRET IDD: ", secretId);
  const response = await fetch(
    `http://localhost:4000/secrets/${userId}_${secretId}`,
    {
      method: "DELETE",
      headers: addAuthHeader({
        "Content-Type": "application/json",
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.log(`Error: ${errorData}`);
    return errorData;
  }
  const responseData = await response.json();
  return responseData;
}
