"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "@/lib/motion";
import { Zap, Clock, Code, Shield, GitPullRequest, Layers } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-400" />,
      title: "Instant Deployment",
      description: "Deploy your React application in seconds with zero configuration required."
    },
    {
      icon: <Clock className="h-8 w-8 text-indigo-400" />,
      title: "Automatic Updates",
      description: "Set up CI/CD pipelines that auto-deploy when you push to your repository."
    },
    {
      icon: <Code className="h-8 w-8 text-purple-400" />,
      title: "Custom Domains",
      description: "Connect your own domain and secure it with a free SSL certificate."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-400" />,
      title: "Enterprise Security",
      description: "Bank-level security with built-in DDoS protection and edge security."
    },
    {
      icon: <GitPullRequest className="h-8 w-8 text-yellow-400" />,
      title: "Preview Deployments",
      description: "Every pull request gets its own preview deployment for easy testing."
    },
    {
      icon: <Layers className="h-8 w-8 text-red-400" />,
      title: "Global CDN",
      description: "Lightning-fast loading times with our global content delivery network."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to deploy and manage your React applications with ease.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="border border-border/50 bg-black/40 backdrop-blur-sm h-full">
                <CardHeader>
                  <div className="mb-3">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}