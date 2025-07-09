import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import type z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import type { SigninValidation } from "@/lib/validation"
import { SignInApi } from "@/api/Signin.api"
import CookieManager from "@/helpers/Cookie"
import Loader from "@/components/shared/Loader"
import { useUserContext } from "@/hooks/useUserContext"

const SigninForm = () => {
  const navigate = useNavigate();
  const isLoading = false;
  const { login } = useUserContext();
  const form = useForm<z.infer<typeof SigninValidation>>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    try {
      const { accessToken, user } = await SignInApi.create(values);

      login(user, accessToken);

      CookieManager.setCookie("accessToken", accessToken, 30);

      console.log("Usuário autenticado:", user);

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  }
  return (
    <Form {...form}>
      <div className="sm:w-[420px] flex-center flex-col">
        {/* image */}
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log in to your account</h2>
        <p className="text-light-3 small-medium md:base-regular text-mt-2">Welcome back! Please enter your details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : "Sign up"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1"> Sign up</Link>
          </p>

        </form>
      </div>
    </Form>
  )
}

export default SigninForm