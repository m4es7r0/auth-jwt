import axios from "axios";
import "./App.css";
import { useAppActions, useAppSelector } from "./hooks/useRedux";

function App() {
  const { isAuth } = useAppSelector((state) => state.auth);
  const { signOut } = useAppActions();

  return (
    <>
      <h1>JWT Auth</h1>
      {!isAuth && (
        <div className="flex gap-2 justify-center p-6 [&>*>*]:uppercase">
          <a href="/signin">
            <button>sign in</button>
          </a>
          <a href="/signup" className="text">
            <button>sign up</button>
          </a>
        </div>
      )}
      {isAuth && (
        <div className="p-6">
          <button
            className="uppercase text-red-400 flex-auto"
            onClick={() => {
              axios
                .post("http://localhost:4000/auth/signout")
                .then(() => signOut());
            }}
          >
            sign out
          </button>
        </div>
      )}
      <p className="read-the-docs">{`${
        isAuth ? "you alredy logged in" : "you have to loggin or sign up"
      }`}</p>
    </>
  );
}

export default App;
