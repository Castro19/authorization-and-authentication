export default async function fetchSecrets({ params }) {
  const userId = params.userId;
  try {
    const response = await fetch(`http://localhost:4000/secrets/${userId}`);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend Uploading secret", errorData);
      throw new Error("Backend posting secret failed: " + errorData.message);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
