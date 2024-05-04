import { Button } from "./components/ui/button";
import { SignupFormDemo } from "./pages/register/SignUpForm";

import "./App.css";

function App() {
  return (
    <>
      <Button
        onClick={() => {
          console.log("Shadcn UI Working");
        }}
      >
        Testing
      </Button>
      <SignupFormDemo />
    </>
  );
}

export default App;
