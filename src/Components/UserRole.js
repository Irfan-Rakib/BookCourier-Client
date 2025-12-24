import { useEffect, useState } from "react";
import axios from "axios";
import UseAuth from "../Hooks/UseAuth";

const useRole = () => {
  const { user, loading } = UseAuth();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(
        `https://book-courier-server-snowy.vercel.app/users/role/${user.email}`
      )
      .then((res) => setRole(res.data.role))
      .finally(() => setRoleLoading(false));
  }, [user]);

  return { role, roleLoading };
};

export default useRole;
