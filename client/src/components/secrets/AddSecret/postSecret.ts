export default async function postSecret(
  userId: string,
  title: string,
  description: string
) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      title,
      description,
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
  } catch (error) {
    console.log("Error posting the secret to the DB");
  }
}