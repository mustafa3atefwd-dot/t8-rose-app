export const loginMessages = {
  en: {
    auth: {
      login: {
        title: "Welcome Back",
        subtitle: "Sign in to your account",
        email: "Email",
        emailPlaceholder: "user@example.com",
        password: "Password",
        passwordPlaceholder: "********",
        forgotPassword: "Forgot password?",
        rememberMe: "Remember me",
        button: "Login",
        noAccount: "Don't have an account yet?",
        register: "Create one now!",
        invalidCredentials: "Invalid email or password",
        networkError: "Something went wrong. Please try again.",
        required: "This field is required",
        invalidEmail: "Invalid email address",
        showPassword: "Show password",
        hidePassword: "Hide password",
        loading: "Loading...",
      },
    },
  },
  ar: {
    auth: {
      login: {
        title: "مرحباً بعودتك",
        subtitle: "سجّل الدخول إلى حسابك",
        email: "البريد الإلكتروني",
        emailPlaceholder: "user@example.com",
        password: "كلمة المرور",
        passwordPlaceholder: "********",
        forgotPassword: "نسيت كلمة المرور؟",
        rememberMe: "تذكرني",
        button: "تسجيل الدخول",
        noAccount: "ليس لديك حساب؟",
        register: "إنشاء حساب",
        invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
        networkError: "حدث خطأ ما. يرجى المحاولة مجدداً.",
        required: "هذا الحقل مطلوب",
        invalidEmail: "عنوان بريد إلكتروني غير صالح",
        showPassword: "إظهار كلمة المرور",
        hidePassword: "إخفاء كلمة المرور",
        loading: "جاري التحميل...",
      },
    },
  },
} as const;

export type LoginLocale = keyof typeof loginMessages;
