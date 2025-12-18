export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-6 md:py-8">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Daan Hessen. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
