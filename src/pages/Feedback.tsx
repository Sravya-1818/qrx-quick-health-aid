// src/pages/Feedback.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Feedback = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // Handle feedback submission (e.g., send to Firestore or toast)
    console.log("Feedback submitted:", message);
    setMessage("");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-muted p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>We value your feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Tell us what you think..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Feedback;
