import React from "react";

const BadSecret = ({ secret }) => {
  console.log("Secret Description:", secret.description);

  return (
    <div>
      <h2>{secret.title}</h2>
      <h4>By: {secret.userName}</h4>
      <p dangerouslySetInnerHTML={{ __html: secret.description }}></p>
    </div>
  );
};

export default BadSecret;
