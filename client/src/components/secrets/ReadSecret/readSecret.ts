import { LoaderFunctionArgs } from "react-router-dom";

interface FetchSecretsInput {
  userName: string;
}
export const fetchSecrets = async ({
  params,
}: LoaderFunctionArgs<FetchSecretsInput>): Promise<any> => {
  const { userName } = params;
  try {
    const response = await fetch(`http://localhost:4000/secrets/${userName}`);
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
};
