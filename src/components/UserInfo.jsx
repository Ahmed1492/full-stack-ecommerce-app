"use client";

import React, { useEffect, useState } from "react";

const UserInfo = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome</p> {/* ✅ Show correct data */}
        </div>
      ) : (
        <p>Loading user...</p>
      )}
    </div>
  );
};

export default UserInfo;
