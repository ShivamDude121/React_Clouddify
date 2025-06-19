"use client";

import { use, useState } from "react";
import { motion } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DeploymentCard } from "@/components/deployment-card";
import { Loader2, GitBranch, CheckCircle2, Code2, Rocket, Server } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const BACKEND_UPLOAD_URL = `http://${process.env.NEXT_PUBLIC_IP}:3000`;

type DeploymentStep = {
  icon: JSX.Element;
  title: string;
  description: string;
};

const deploymentSteps: DeploymentStep[] = [
  {
    icon: <GitBranch className="h-5 w-5" />,
    title: "Cloning Repository",
    description: "Fetching your code from GitHub"
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "Installing Dependencies",
    description: "Setting up project requirements"
  },
  {
    icon: <Server className="h-5 w-5" />,
    title: "Building Project",
    description: "Compiling and optimizing"
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: "Deploying",
    description: "Publishing to production"
  }
];

export function GithubForm() {
  const [id ,setid]=useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [deploymentResult, setDeploymentResult] = useState<{ url: string; repository: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const validateGithubUrl = (url: string) => {
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/i;
    return githubRegex.test(url);
  };

  const simulateDeployment = async () => {
    for (let i = 0; i < deploymentSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateGithubUrl(githubUrl)) {
      setError("Please enter a valid GitHub repository URL");
      return;
    }

    setIsLoading(true);
    
    try {

      const res = await axios.post(`${BACKEND_UPLOAD_URL}/deploy`, {
        repoUrl: githubUrl,
      });
     // console.log(res.data);

      await new Promise((resolve) => setTimeout(resolve, 1000));


      setid(res.data.id);

      const repositoryName = githubUrl.split('/').pop() || 'repository';
      const deploymentUrl = `http://${process.env.NEXT_PUBLIC_IP}:3001/index.html?id=${res.data.id}`;
      



      const statusInterval = setInterval(async () => {
        const response = await axios.get(`${BACKEND_UPLOAD_URL}/status?id=${res.data.id}`);

        

      //  console.log(response.data)

        if (response.data.status === "deployed") {
          clearInterval(statusInterval);
          setIsLoading(false);
          setCurrentStep(0);
          setid("");

         setDeploymentResult({
        url: deploymentUrl,
        repository: githubUrl
      });

      toast({
        title: "Deployment successful!",
        description: "Your application has been deployed successfully.",
      });
        }
        else if (response.data.status === "Cloning Repository") {setCurrentStep(0);}
        else if (response.data.status === "Uploading Files To S3") {setCurrentStep(1);}
        else if (response.data.status === "downlaoding") {setCurrentStep(2);}
        else if (response.data.status === "building") {setCurrentStep(3);}
      }, 1000);





      
      
      
      
    } catch (err) {
      setError("Failed to process your repository. Please try again.");
      
      toast({
        title: "Deployment failed",
        description: "There was an error deploying your application.",
        variant: "destructive"
      });
    } finally {
    
     
    }
  };

  const handleReset = () => {
    setGithubUrl("");
    setDeploymentResult(null);
  };

  return (
    <section id="github-form" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="overflow-hidden border border-border/50 bg-black/40 backdrop-blur-xl shadow-xl rounded-2xl">
            <CardContent className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
                Deploy Your React Repository
              </h2>
              
              {!deploymentResult ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="github-url" className="text-sm font-medium text-muted-foreground">
                      GitHub Repository URL
                    </label>
                    <div className="relative">
                      <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="github-url"
                        type="text"
                        placeholder="https://github.com/username/repository"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        className="pl-10 bg-background/50 border-border/50 focus:border-blue-500 transition-all"
                        disabled={isLoading}
                      />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                  </div>

                  {isLoading && (
                    <div className="space-y-4 my-8">
                      {deploymentSteps.map((step, index) => {
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;
                        
                        return (
                          <div
                            key={index}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                              isActive ? 'bg-blue-500/10 border border-blue-500/20' : ''
                            }`}
                          >
                            <div className={`${isActive ? 'text-blue-400 animate-pulse' : isCompleted ? 'text-green-400' : 'text-muted-foreground'}`}>
                              {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : step.icon}
                            </div>
                            <div>
                              <p className={`font-medium ${isActive ? 'text-blue-400' : isCompleted ? 'text-green-400' : 'text-muted-foreground'}`}>
                                {step.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deploying...
                      </>
                    ) : (
                      "Deploy Now"
                    )}
                  </Button>
                </form>
              ) : (
                <DeploymentCard 
                  deploymentUrl={deploymentResult.url}
                  repository={deploymentResult.repository}
                  onReset={handleReset}
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}