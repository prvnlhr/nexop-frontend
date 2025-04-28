"use client";
import Link from "next/link";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/lib/services/auth/authServices";
import { authenticate } from "@/actions/auth/authenticate";
import { Oval } from "react-loader-spinner";
import { useSession } from "next-auth/react";

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
  const { update } = useSession();
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
        const result = await authenticate({
          email: data.email,
          password: data.password,
          role: role,
        });

        if (result.error) {
          const errorMessage = result.error.message;
          if (errorMessage.includes("No account found")) {
            setError("email", {
              message: "No account found with this email",
            });
          } else if (errorMessage.includes("Incorrect password")) {
            setError("password", {
              message: "Incorrect password",
            });
          } else if (errorMessage.includes("Invalid role")) {
            setError("root", {
              message: "Selected role does not match your account",
            });
          } else if (errorMessage.includes("Invalid input")) {
            setError("root", {
              message: errorMessage.replace("Invalid input: ", ""),
            });
          } else if (errorMessage.includes("No user data")) {
            setError("root", {
              message: "Authentication failed due to missing user data",
            });
          } else {
            setError("root", {
              message: errorMessage || "Failed to sign in. Please try again.",
            });
          }
          return;
        }
        await update();
      }
      onSuccess();
    } catch (error: unknown) {
      console.error("Auth error:", error);
      const message =
        error instanceof Error &&
        (error.message.includes("Network error") ||
          error.message.includes("Failed to fetch"))
          ? "Network error. Please check your connection."
          : isSignUp
          ? "Failed to create account. Please try again."
          : "Failed to sign in. Please try again.";
      setError("root", { message });
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
      className="w-[95%] h-[90%] md:w-[80%] md:h-[100%] grid grid-rows-[15%_20%_20%_20%_25%] border border-black/10 rounded px-[25px] py-[10px]"
    >
      <div className="w-full h-full flex items-center justify-center">
        {errors.root && (
          <p className="text-red-500 text-[0.75rem] bg-red-200 px-[10px] py-[5px] rounded">
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
                {errors.fullname?.message}
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
            className="w-full h-[80%] flex items-center justify-center  bg-[#444444] text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="w-[18px] h-[18px] flex items-center">
                <Oval
                  visible={true}
                  color="white"
                  secondaryColor="transparent"
                  strokeWidth="3"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass="w-[20px] h-[20px] flex items-center justify-center"
                />
              </div>
            ) : (
              <p className="text-[0.7rem]">
                {isSignUp ? "Sign Up" : "Sign In"}
              </p>
            )}
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
