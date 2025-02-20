import { useUser } from "../../Context/UserContext";

function Tasks() {
  const { user, isLoading, isError } = useUser();

  return (
    <div>
      {isLoading && <h3>Loading user...</h3>}

      {isError && <h3 style={{ color: "red" }}>Failed to fetch user.</h3>}

      {user && (
        <div>
          <h1>{user.name}</h1>
          <h2>{user.email}</h2>
        </div>
      )}
    </div>
  );
}

export default Tasks;
