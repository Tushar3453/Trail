import { useState, type SubmitEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Compass, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { login } from "../../services/auth";
import { loginSchema } from "../../schemas/auth";
import { loginStyles } from "./LoginFormStyle.tailwind";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const validation = loginSchema.safeParse({ email, password });
        if (!validation.success) {
            setError(validation.error.issues[0]?.message || "Invalid input");
            return;
        }

        setIsLoading(true);

        try {
            const res = await login(validation.data);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={loginStyles.pageContainer}>
            <div className={loginStyles.backgroundGlow} />

            <div className={loginStyles.card}>
                {/* Header & Brand */}
                <div className={loginStyles.header}>
                    <div className={loginStyles.brandBadge}>
                        <Compass className="w-5 h-5 text-neutral-100" />
                    </div>
                    <h1 className={loginStyles.title}>Welcome back</h1>
                    <p className={loginStyles.subtitle}>Enter your details to sign in to Trail</p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className={loginStyles.errorBanner} role="alert">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className={loginStyles.form}>
                    <div className={loginStyles.fieldGroup}>
                        <label htmlFor="email" className={loginStyles.label}>Email address</label>
                        <div className={loginStyles.inputWrapper}>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                required
                                disabled={isLoading}
                                className={loginStyles.input}
                            />
                        </div>
                    </div>

                    <div className={loginStyles.fieldGroup}>
                        <label htmlFor="password" className={loginStyles.label}>Password</label>
                        <div className={loginStyles.inputWrapper}>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                disabled={isLoading}
                                className={loginStyles.inputWithIcon}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={loginStyles.passwordToggle}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button type="submit" disabled={isLoading} className={loginStyles.submitButton}>
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin text-neutral-900" />
                                <span>Signing in...</span>
                            </>
                        ) : (
                            "Sign in"
                        )}
                    </button>
                </form>

                {/* Footer Switcher */}
                <div className={loginStyles.footer}>
                    <span>Don't have an account?</span>
                    <Link to="/signup" className={loginStyles.footerLink}>
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;