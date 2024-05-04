export default async function (userId: number, secretId: number) {
  try {
    const response = await fetch(
      `http://localhost:4000/secrets/${userId}_${secretId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log(`Error: ${errorData}`);
      throw new Error("FAILED To delete secret" + errorData.message);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(`Error: Could not establish connection to DB to delete secret`);
  }
}
