export async function handleSignup(userName: string, password: string) {
  // Now, send a request to backend to store username and hash password
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
    return errorData;
  } else {
    const responseData = await response.json();
    console.log("Backend Registration worked!: ", responseData);
    localStorage.setItem("token", responseData.token);
    return responseData;
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
