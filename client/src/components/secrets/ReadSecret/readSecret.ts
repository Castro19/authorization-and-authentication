import addAuthHeader from "@/security/authHeader";
import { LoaderFunctionArgs } from "react-router-dom";

interface FetchSecretsInput {
  userName: string;
}
export const fetchSecrets = async ({
  params,
}: LoaderFunctionArgs<FetchSecretsInput>): Promise<any> => {
  const { userName } = params;
  const options = {
    method: "GET",
    headers: addAuthHeader({
      "Content-Type": "application/json",
    }),
  };
  try {
    const response = await fetch(
      `http://localhost:4000/secrets/${userName}`,
      options
    );
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
