import { Navigate, Outlet } from "react-router";
import useRole from "../Components/UserRole";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const LibrarianRoute = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (role !== "librarian" && role !== "admin") {
    return <ErrorPage />;
  }

  return <Outlet />;
};

export default LibrarianRoute;
