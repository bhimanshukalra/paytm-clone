import { BottomWarning, Button, Heading, InputBox, SubHeading } from "../components"

export const SignIn = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign In" />
          <SubHeading label="Enter your credentials to access your account" />
          <InputBox placeholder="email@domain.com" label="Email" />
          <InputBox placeholder="123456" label="Password" />
          <div className="pt-4">
            <Button label="Sign In" />
          </div>
          <BottomWarning label="Don't have an account?" linkText="Sign up" linkDestination="/signup" />
        </div>
      </div>
    </div>
  )
}
