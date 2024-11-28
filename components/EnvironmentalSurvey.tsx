"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { saveResponses, hasSubmitted } from '../utils/surveyStorage';
import { motion } from "framer-motion";
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const questions = [
  "Are you aware of the concept of climate change?",
  "Do you know what greenhouse gases are?",
  "Have you heard of the term \"carbon footprint\"?",
  "Do you believe human activities significantly impact the environment?",
  "Are you familiar with the concept of sustainable living?",
  "Do you avoid using single-use plastic items?",
  "Do you regularly recycle waste at home or work?",
  "Have you ever participated in a tree-planting event?",
  "Do you use energy-efficient appliances in your home?",
  "Do you turn off lights and appliances when not in use?",
  "Do you use public transportation, carpool, or cycle regularly to reduce your carbon footprint?",
  "Have you considered or switched to electric or hybrid vehicles?",
  "Do you know if your electricity provider offers renewable energy options?",
  "Do you avoid unnecessary air travel to reduce emissions?",
  "Do you use renewable energy sources, such as solar panels, in your home?",
  "Do you make efforts to conserve water in your daily activities?",
  "Have you taken steps to reduce food waste in your household?",
  "Do you compost organic waste?",
  "Do you avoid dumping waste in natural water bodies?",
  "Do you participate in community clean-up drives?",
  "Do you actively discuss environmental issues with others?",
  "Have you ever attended a workshop or seminar on environmental topics?",
  "Do you support businesses that follow sustainable practices?",
  "Do you follow government or local regulations for waste segregation and disposal?",
  "Are you aware of global initiatives like the Paris Agreement or COP conferences?"
];

export default function EnvironmentalSurvey() {
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  useEffect(() => {
    const checkSubmission = async () => {
      const checkSubmitted = await hasSubmitted();
      setAlreadySubmitted(checkSubmitted);
      setSubmitted(checkSubmitted);
    };
    checkSubmission();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(responses).length === questions.length) {
      await saveResponses(responses);
      setSubmitted(true);
    } else {
      alert("Please answer all questions before submitting.");
    }
  };

  const handleNext = () => {
    if (responses[currentQuestion]) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    } else {
      alert("Please answer the current question before moving to the next one.");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (alreadySubmitted) {
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-2xl">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Thank You!</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-lg">You have already submitted the survey. Thank you for your participation!</p>
        </CardContent>
      </Card>
    );
  }

  if (submitted) {
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-2xl">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Thank You!</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-lg">Your responses have been recorded. Thank you for participating in our environmental awareness survey!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-2xl">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-3xl font-bold">Environmental Awareness Survey</CardTitle>
        <CardDescription className="text-lg">Help us understand environmental awareness in your community</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold mb-4">Question {currentQuestion + 1} of {questions.length}</h2>
            <Label htmlFor={`question-${currentQuestion}`} className="text-lg">
              {questions[currentQuestion]}
            </Label>
            <RadioGroup
              id={`question-${currentQuestion}`}
              onValueChange={(value) => setResponses(prev => ({ ...prev, [currentQuestion]: value }))}
              className="flex space-x-4"
              value={responses[currentQuestion]}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id={`yes-${currentQuestion}`} />
                <Label htmlFor={`yes-${currentQuestion}`}>Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id={`no-${currentQuestion}`} />
                <Label htmlFor={`no-${currentQuestion}`}>No</Label>
              </div>
            </RadioGroup>
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" onClick={handlePrevious} disabled={currentQuestion === 0} variant="outline">
            Previous
          </Button>
          {currentQuestion === questions.length - 1 ? (
            <Button type="submit" className="bg-green-500 hover:bg-green-600">Submit Survey</Button>
          ) : (
            <Button type="button" onClick={handleNext} className="bg-blue-500 hover:bg-blue-600">Next</Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}

