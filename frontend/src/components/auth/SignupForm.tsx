import { useState, type SubmitEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Compass, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { signup } from "../../services/auth";
import { signupSchema } from "../../schemas/auth";
import { signupStyles } from "./SignupFormStyle.tailwind";

const SignupForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const validation = signupSchema.safeParse({ firstName, lastName, phone, email, password });
        if (!validation.success) {
            setError(validation.error.issues[0]?.message || "Invalid input");
            return;
        }

        setIsLoading(true);

        try {
            await signup(validation.data);
            navigate('/login');
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={signupStyles.pageContainer}>
            <div className={signupStyles.backgroundGlow} />

            <div className={signupStyles.card}>
                {/* Header & Brand */}
                <div className={signupStyles.header}>
                    <div className={signupStyles.brandBadge}>
                        <Compass className="w-5 h-5 text-neutral-100" />
                    </div>
                    <h1 className={signupStyles.title}>Create an account</h1>
                    <p className={signupStyles.subtitle}>Get started with your free Trail workspace</p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className={signupStyles.errorBanner} role="alert">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className={signupStyles.form}>
                    {/* 2-Column Name Row */}
                    <div className={signupStyles.nameGrid}>
                        <div className={signupStyles.fieldGroup}>
                            <label htmlFor="firstName" className={signupStyles.label}>First name</label>
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Jane"
                                required
                                disabled={isLoading}
                                className={signupStyles.input}
                            />
                        </div>

                        <div className={signupStyles.fieldGroup}>
                            <label htmlFor="lastName" className={signupStyles.label}>Last name</label>
                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Doe"
                                disabled={isLoading}
                                className={signupStyles.input}
                            />
                        </div>
                    </div>

                    <div className={signupStyles.fieldGroup}>
                        <label htmlFor="phone" className={signupStyles.label}>Phone number</label>
                        <input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            required
                            disabled={isLoading}
                            className={signupStyles.input}
                        />
                    </div>

                    <div className={signupStyles.fieldGroup}>
                        <label htmlFor="email" className={signupStyles.label}>Email address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="jane@company.com"
                            required
                            disabled={isLoading}
                            className={signupStyles.input}
                        />
                    </div>

                    <div className={signupStyles.fieldGroup}>
                        <label htmlFor="password" className={signupStyles.label}>Password</label>
                        <div className={signupStyles.inputWrapper}>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a secure password"
                                required
                                disabled={isLoading}
                                className={signupStyles.inputWithIcon}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={signupStyles.passwordToggle}
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

                    <button type="submit" disabled={isLoading} className={signupStyles.submitButton}>
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin text-neutral-900" />
                                <span>Creating account...</span>
                            </>
                        ) : (
                            "Create account"
                        )}
                    </button>
                </form>

                {/* Footer Switcher */}
                <div className={signupStyles.footer}>
                    <span>Already have an account?</span>
                    <Link to="/login" className={signupStyles.footerLink}>
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;