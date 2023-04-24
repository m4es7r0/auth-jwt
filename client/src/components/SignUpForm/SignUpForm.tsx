import axios from "axios";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppActions } from "../../hooks/useRedux";

const SignUp: FC = () => {
  const { signUp } = useAppActions();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  return (
    <div className="form">
      <div className="flex flex-col flex-1 gap-4">
        <input
          type="text"
          name="fullname"
          id="fullname"
          placeholder="Fullname"
          minLength={3}
          maxLength={32}
          onChange={(e) => setFullname(e.target.value)}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button
        onClick={() => {
          axios
            .post("http://localhost:4000/auth/signup", {
              email,
              password,
              fullname,
            })
            .then((res) => signUp(res.data))
            .then(() => navigate("/"));
        }}
      >
        Sign up
      </button>
    </div>
  );
};

export default SignUp;
