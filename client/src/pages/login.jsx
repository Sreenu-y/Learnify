import { Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerData,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
      error: registerError,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      isSuccess: loginIsSuccess,
      isLoading: loginIsLoading,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (registerIsSuccess && registerData)
      toast.success(registerData.message || "Signup successful.");
    if (registerError)
      toast.error(registerError?.data?.message || "Signup failed");
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Welcome back!");
      navigate("/");
    }
    if (loginError) toast.error(loginError?.data?.message || "Login failed");
  }, [
    loginIsSuccess,
    registerIsSuccess,
    loginData,
    registerData,
    loginError,
    registerError,
    navigate,
  ]);

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") setSignupInput({ ...signupInput, [name]: value });
    else setLoginInput({ ...loginInput, [name]: value });
  };

  const handleRegistration = async (type) => {
    await (type === "signup"
      ? registerUser(signupInput)
      : loginUser(loginInput));
  };

  const inputClass =
    "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-black/25 dark:placeholder:text-white/20 focus:border-black/30 dark:focus:border-white/30 rounded-xl h-11";

  const LabelEl = ({ children }) => (
    <Label className="text-black/40 dark:text-white/40 text-xs uppercase tracking-wider">
      {children}
    </Label>
  );

  return (
    <div className="grid-bg min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="relative z-10 w-full max-w-md animate-slide-up delay-0">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-13 h-13 rounded-2xl bg-black dark:bg-white p-3 animate-pulse-glow">
            <Zap size={28} className="text-white dark:text-black" />
          </div>
          <h1 className="text-2xl font-black text-black dark:text-white tracking-tight">
            Learnify
          </h1>
          <p className="text-black/35 dark:text-white/30 text-sm">
            Your gateway to expert-led learning
          </p>
        </div>

        {/* Card */}
        <div className="glass-card p-1">
          <Tabs defaultValue="login">
            <TabsList className="w-full bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 rounded-xl p-1 mb-2">
              <TabsTrigger
                value="login"
                className="flex-1 rounded-lg text-black/40 dark:text-white/40 data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black transition-all font-semibold"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="flex-1 rounded-lg text-black/40 dark:text-white/40 data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black transition-all font-semibold"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Login */}
            <TabsContent value="login" className="p-5 space-y-5">
              <div>
                <h2 className="text-lg font-bold text-black dark:text-white">
                  Welcome back
                </h2>
                <p className="text-black/30 dark:text-white/30 text-sm">
                  Sign in to continue learning
                </p>
              </div>
              <div className="divider-text">or continue with email</div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <LabelEl>Email</LabelEl>
                  <Input
                    type="email"
                    name="email"
                    value={loginInput.email}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <LabelEl>Password</LabelEl>
                  <Input
                    type="password"
                    name="password"
                    value={loginInput.password}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="••••••••"
                    className={inputClass}
                  />
                </div>
              </div>
              <Button
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
                className="btn-glow w-full h-11 rounded-xl text-sm"
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In →"
                )}
              </Button>
            </TabsContent>

            {/* Signup */}
            <TabsContent value="signup" className="p-5 space-y-5">
              <div>
                <h2 className="text-lg font-bold text-black dark:text-white">
                  Create an account
                </h2>
                <p className="text-black/30 dark:text-white/30 text-sm">
                  Join thousands of learners today
                </p>
              </div>
              <div className="divider-text">fill in your details</div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <LabelEl>Name</LabelEl>
                  <Input
                    type="text"
                    name="name"
                    value={signupInput.name}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <LabelEl>Email</LabelEl>
                  <Input
                    type="email"
                    name="email"
                    value={signupInput.email}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <LabelEl>Password</LabelEl>
                  <Input
                    type="password"
                    name="password"
                    value={signupInput.password}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="••••••••"
                    className={inputClass}
                  />
                </div>
              </div>
              <Button
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
                className="btn-glow w-full h-11 rounded-xl text-sm"
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account →"
                )}
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        <p className="text-center text-black/20 dark:text-white/15 text-xs mt-6">
          By continuing you agree to our Terms of Service &amp; Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
