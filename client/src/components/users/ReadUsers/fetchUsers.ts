export default async function fetchUsers() {
  try {
    const response = await fetch(`http://localhost:4000/users`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Error Fetching users from database" + errorData.message);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(`Error fetching users: `, error);
  }
}
