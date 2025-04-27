"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCw, ExternalLink } from "lucide-react";
import { motion } from "@/lib/motion";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface DeploymentCardProps {
  deploymentUrl: string;
  repository: string;
  onReset: () => void;
}

export function DeploymentCard({ deploymentUrl, repository, onReset }: DeploymentCardProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(deploymentUrl);
    setCopied(true);
    
    toast({
      title: "URL copied",
      description: "Deployment URL copied to clipboard"
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-green-500" />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold">Deployment Successful!</h3>
        <p className="text-muted-foreground">Your React application has been deployed</p>
      </div>
      
      <div className="space-y-4 mt-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-muted-foreground">Repository</label>
            <Badge variant="outline" className="text-xs">GitHub</Badge>
          </div>
          <div className="truncate bg-background/50 p-3 rounded-md border border-border/50 text-sm">
            {repository}
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-muted-foreground">Deployment URL</label>
            <Badge variant="outline" className="text-blue-400 border-blue-400/30 bg-blue-400/10">Live</Badge>
          </div>
          <div className="flex items-center">
            <div className="flex-1 truncate bg-background/50 p-3 rounded-l-md border border-border/50 text-sm text-blue-400">
              {deploymentUrl}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-l-none h-[38px]"
              onClick={handleCopy}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button 
          variant="outline" 
          className="flex-1 border-border/50"
          onClick={onReset}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Deploy Another
        </Button>
        
        <Button 
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          onClick={() => window.open(deploymentUrl, '_blank')}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Visit Site
        </Button>
      </div>
    </motion.div>
  );
}