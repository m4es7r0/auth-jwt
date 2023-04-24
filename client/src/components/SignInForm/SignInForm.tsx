import axios from "axios";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppActions } from "../../hooks/useRedux";

const SignIn: FC = () => {
  const { signIn } = useAppActions();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="form">
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
      <button
        onClick={() =>
          axios
            .post("http://localhost:4000/auth/signin", { email, password })
            .then((res) => signIn(res.data))
            .then(() => navigate("/"))
        }
      >
        Sign in
      </button>
    </div>
  );
};

export default SignIn;
