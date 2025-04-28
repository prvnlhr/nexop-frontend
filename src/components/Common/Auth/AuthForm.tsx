"use client";
import Link from "next/link";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/lib/services/auth/authServices";
import { signIn } from "next-auth/react";
// Zod schemas
const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9]).+$/,
      "Must contain at least 1 uppercase letter and 1 number"
    ),
});

const signUpSchema = signInSchema.extend({
  fullname: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "No numbers or special characters allowed"),
});

type SignInFormData = z.infer<typeof signInSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;

type AuthFormProps = {
  isSignUp: boolean;
  role: "customer" | "admin";
  basePath: string; // e.g., "/shop/auth" or "/admin/auth"
  onSuccess: () => void;
};

const AuthForm = ({ isSignUp, role, basePath, onSuccess }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInFormData | SignUpFormData>({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
  });

  const onSubmit = async (data: SignInFormData | SignUpFormData) => {
    try {
      if (isSignUp) {
        await signUp({ ...data, role } as SignUpFormData & {
          role: "customer" | "admin";
        });
      } else {
        // await signIn({ ...data, role } as SignInFormData & {
        //   role: "customer" | "admin";
        // });

        const result = await signIn("credentials", {
          email: data.email,
          password: data.password,
          role: role,
          redirect: false,
        });

        if (result?.error) {
          throw new Error(result.error);
        }
      }
      onSuccess();
    } catch (error) {
      console.log(" error:", error);
      if (error instanceof Error) {
        // Handle specific error messages from the server
        const errorMessage = error.message;

        // For sign-in specific errors
        if (!isSignUp) {
          if (errorMessage.includes("No account found")) {
            setError("root", {
              message: "Account with this email does not exist",
            });
            return;
          }
          if (errorMessage.includes("Incorrect password")) {
            setError("root", { message: "Invalid password" });
            return;
          }
          if (errorMessage.includes("Invalid role")) {
            setError("root", { message: "Unauthorized access for this role" });
            return;
          }
        }

        // For sign-up specific errors
        if (isSignUp && errorMessage.includes("Email already exists")) {
          setError("root", { message: "This email is already registered" });
          return;
        }

        // For network errors
        if (errorMessage.includes("Network error")) {
          setError("root", {
            message: "Network error. Please check your connection.",
          });
          return;
        }

        // Fallback to generic error message
        setError("root", {
          message: isSignUp
            ? "Failed to create account. Please try again."
            : "Failed to sign in. Please try again.",
        });
      } else {
        setError("root", { message: "An unexpected error occurred" });
      }
    }
  };

  const hasFullnameError = (
    errors: FieldErrors<SignInFormData | SignUpFormData>
  ): errors is FieldErrors<SignUpFormData> => {
    return !!errors && "fullname" in errors;
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[95%] h-[90%] md:w-[80%] md:h-[80%] grid grid-rows-[15%_20%_20%_20%_25%] border border-black/10 rounded px-[25px] py-[10px]"
    >
      <div className="w-full h-full flex items-center justify-center">
        {errors.root && (
          <p className="text-red-500 text-[0.75rem] bg-red-200 px-[10px] py-[5px] rounded ">
            {errors.root.message}
          </p>
        )}
      </div>

      {/* FULLNAME GROUP (Sign-up only) */}
      {isSignUp && (
        <div className="w-[100%] h-[100%] grid grid-rows-[30px_minmax(0,1fr)_30px]">
          <div className="w-full h-[100%] flex items-center">
            <p className="text-[0.8rem] font-medium">FULLNAME</p>
          </div>
          <div className="w-full h-[100%]">
            <input
              {...register("fullname")}
              className="w-full h-full border-b border-black/20 text-[0.8rem]"
              placeholder="Enter your full name"
            />
          </div>
          <div className="w-full h-[100%]">
            {hasFullnameError(errors) && (
              <p className="text-red-500 text-[0.7rem]">
                {errors.fullname && errors.fullname.message}
              </p>
            )}
          </div>
        </div>
      )}

      {/* EMAIL GROUP */}
      <div className="w-[100%] h-[100%] grid grid-rows-[30px_minmax(0,1fr)_30px]">
        <div className="w-full h-[100%] flex items-center">
          <p className="text-[0.8rem] font-medium">EMAIL</p>
        </div>
        <div className="w-full h-[100%]">
          <input
            {...register("email")}
            className="w-full h-full border-b border-black/20 text-[0.8rem]"
            placeholder="Enter your email"
          />
        </div>
        <div className="w-full h-[100%]">
          {errors.email && (
            <p className="text-red-500 text-[0.7rem]">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* PASSWORD GROUP */}
      <div className="w-[100%] h-[100%] grid grid-rows-[30px_minmax(0,1fr)_30px]">
        <div className="w-full h-[100%] flex items-center">
          <p className="text-[0.8rem] font-medium">PASSWORD</p>
        </div>
        <div className="w-full h-[100%]">
          <input
            type="password"
            {...register("password")}
            className="w-full h-full border-b border-black/20 text-[0.8rem]"
            placeholder={isSignUp ? "Create a password" : "Enter your password"}
          />
        </div>
        <div className="w-full h-[100%]">
          {errors.password && (
            <p className="text-red-500 text-[0.7rem]">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      {/* Footer - Submit Button */}
      <div className="w-[100%] h-[100%] flex flex-col items-center">
        <div className="w-full h-[50%]">
          <button
            type="submit"
            className="w-full h-[80%] bg-[#444444]"
            disabled={isSubmitting}
          >
            <p className="text-[0.7rem] text-white">
              {isSubmitting
                ? isSignUp
                  ? "Signing Up..."
                  : "Signing In..."
                : isSignUp
                ? "Sign Up"
                : "Sign In"}
            </p>
          </button>
        </div>
        <div className="w-full h-[50%] flex items-center justify-center">
          <p className="text-[0.75rem]">
            {isSignUp ? "Already have an account?" : "Not yet Signed Up?"}
            <Link
              className="font-medium hover:underline ml-1"
              href={`${basePath}/${isSignUp ? "sign-in" : "sign-up"}`}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
