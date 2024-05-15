type updateSecretType = {
  userId: string;
  secretId: string;
  title: string;
  description: string;
};
export default async function updateSecret(secret: updateSecretType) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: secret.userId,
      title: secret.title,
      description: secret.description,
    }),
  };
  console.log("Opt: ", options);
  try {
    const response = await fetch(
      `http://localhost:4000/secrets/${secret.secretId}`,
      options
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.log(`Error with updating secret: ${errorData}`);
      throw new Error("Error with updating secret: " + errorData.message);
    }
    const responseData = await response.json();
    console.log("Response Data: ", responseData);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
