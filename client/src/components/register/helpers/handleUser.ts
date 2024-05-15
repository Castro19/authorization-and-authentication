export async function handleSignup(userName: string, password: string) {
  // Now, send a request to your backend to store additional user information
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    };
    const response = await fetch(
      "http://localhost:4000/registers/signup",
      options
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend registration failed", errorData);
      throw new Error("Backend registration failed: " + errorData.message);
    }
    const responseData = await response.json();
    console.log("Backend Registration worked!: ", responseData);
    localStorage.setItem("token", responseData.token);
    return responseData;
  } catch (error) {
    console.error("Backend registration failed", error);
  }
}

// Front end handler function
export async function handleLogin(userName: string, password: string) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName,
      password,
    }),
  };
  const response = await fetch(
    `http://localhost:4000/registers/login`,
    options
  );
  const responseData = await response.json();
  // Check if the server's response includes a token and the request was successful
  if (response.ok && responseData.token) {
    localStorage.setItem("token", responseData.token);
    console.log("Login successful, token stored.");
  } else {
    // Log an error or handle it as needed
    console.error("Login failed: ", responseData.message);
  }
  return responseData;
}
