import React from "react";

const Profile = ({ match }) => {
  const { username } = match.params;
  return <h1>{username}</h1>;
};

export default Profile;
