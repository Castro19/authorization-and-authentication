import addAuthHeader from "@/security/authHeader";

export default async function postSecret(
  userId: string,
  userName: string,
  title: string,
  description: string,
  permissions: {
    userId: string;
    roles: string[];
  }
) {
  const options = {
    method: "POST",
    headers: addAuthHeader({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      userId,
      userName,
      title,
      description,
      permissions,
    }),
  };
  console.log("API options: ", options);

  try {
    const response = await fetch("http://localhost:4000/secrets", options);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend Uploading secret", errorData);
      throw new Error("Backend posting secret failed: " + errorData.message);
    }
    const responseData = await response.json();
    console.log("Uploading Secrets worked!: ", responseData);
    return responseData["secretId"];
  } catch (error) {
    console.log("Error posting the secret to the DB");
  }
}
