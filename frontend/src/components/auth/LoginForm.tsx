import { useState, type SubmitEvent } from "react"
import { login } from "../../services/auth";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await login({ email, password });
        console.log(res);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Email</label>    
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
            />
            <label>Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
            />
            <button type="submit">Login</button>
        </form>
    )
};

export default LoginForm