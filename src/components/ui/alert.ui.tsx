import * as React from "react"

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive"
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ className = "", variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "bg-gray-50 text-gray-800 border-gray-200",
    destructive: "bg-red-50 text-red-800 border-red-200",
  }

  return (
    <div
      ref={ref}
      role="alert"
      className={`relative w-full rounded-lg border p-4 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
})

Alert.displayName = "Alert"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className = "", ...props }, ref) => <div ref={ref} className={`text-sm ${className}`} {...props} />,
)

AlertDescription.displayName = "AlertDescription"

export { Alert, AlertDescription }
