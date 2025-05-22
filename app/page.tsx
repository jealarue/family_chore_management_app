import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Star, Trophy, Gift, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">FC</span>
            </span>
            <span className="text-xl font-bold">FamilyChores</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#benefits" className="text-sm font-medium hover:text-primary">
              Benefits
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background z-0"></div>
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Motivate Your Family with <span className="text-primary">Rewards</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  A fun and engaging way to manage chores, track progress, and reward your children for their hard work.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/dashboard">
                    <Button size="lg" className="w-full sm:w-auto">
                      Start Managing Chores
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-xl overflow-hidden border border-primary/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="flex justify-center mb-4">
                        <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                          <Trophy className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Family Leaderboard</h3>
                      <p className="text-muted-foreground">
                        Track progress and create friendly competition
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Key Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage your family's chores and reward system
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <CheckCircle className="h-10 w-10 text-primary" />,
                  title: "Task Management",
                  description: "Create, assign, and track chores for each family member",
                },
                {
                  icon: <Star className="h-10 w-10 text-primary" />,
                  title: "Points System",
                  description: "Award points for completed tasks and good behavior",
                },
                {
                  icon: <Trophy className="h-10 w-10 text-primary" />,
                  title: "Leaderboard",
                  description: "Foster friendly competition with a family leaderboard",
                },
                {
                  icon: <Gift className="h-10 w-10 text-primary" />,
                  title: "Rewards",
                  description: "Convert points to rewards or money for motivation",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Simple steps to get your family motivated and organized
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Create Tasks",
                  description: "Set up chores with point values and assign them to family members",
                },
                {
                  step: "2",
                  title: "Complete & Verify",
                  description: "Children complete tasks and parents verify completion",
                },
                {
                  step: "3",
                  title: "Earn Rewards",
                  description: "Convert earned points into rewards or money",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="relative"
                >
                  <div className="bg-card rounded-lg p-6 shadow-md border border-border h-full">
                    <div className="absolute -top-5 left-6 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {step.step}
                    </div>
                    <div className="pt-6">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-muted/50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Benefits for the Whole Family
                </h2>
                <div className="space-y-4">
                  {[
                    "Teaches responsibility and work ethic",
                    "Creates structure and routine",
                    "Reduces parent-child conflicts over chores",
                    "Provides motivation through rewards",
                    "Builds financial literacy through earning",
                    "Promotes teamwork and cooperation",
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <p>{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-xl overflow-hidden border border-primary/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="flex justify-center mb-4">
                        <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Family Harmony</h3>
                      <p className="text-muted-foreground">
                        Create a more organized and peaceful household
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/10">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Family's Chore System?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Start managing tasks, rewarding good behavior, and creating a more organized household today.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="px-8">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">FC</span>
                </span>
                <span className="text-xl font-bold">FamilyChores</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A family chore management app with points and rewards system.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Task Management</li>
                <li>Points System</li>
                <li>Leaderboard</li>
                <li>Rewards</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} FamilyChores. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}