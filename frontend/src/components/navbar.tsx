import { Link } from 'react-router-dom'
import { Button } from './ui/button'

export function Navbar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg text-foreground">
          <span className="sr-only">ReciShare Home</span>
          ReciShare
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Home
          </Link>

          <Button asChild variant="ghost" className="text-sm">
            <Link to="/login">Login</Link>
          </Button>

          <Button asChild className="text-sm">
            <Link to="/signup">Sign up</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
