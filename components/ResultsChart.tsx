"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LabelList } from "recharts"
import { motion } from "framer-motion";
import { Loader2 } from 'lucide-react'

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

export default function ResultsChart() {
  const [results, setResults] = useState<{ question: string; yesPercentage: number; noPercentage: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const eventSource = new EventSource('/api/survey-updates');

    eventSource.onmessage = (event) => {
      const allResponses = JSON.parse(event.data);
      const totalResponses = allResponses.length;

      const calculatedResults = questions.map((question, index) => {
        const yesCount = allResponses.filter((response: { data: Record<number, string> }) => response.data[index] === 'yes').length;
        const yesPercentage = totalResponses > 0 ? (yesCount / totalResponses) * 100 : 0;
        const noPercentage = totalResponses > 0 ? 100 - yesPercentage : 0;

        return {
          question,
          yesPercentage: parseFloat(yesPercentage.toFixed(2)),
          noPercentage: parseFloat(noPercentage.toFixed(2))
        };
      });

      setResults(calculatedResults);
      setIsLoading(false);
    };

    eventSource.onerror = () => {
      console.error('EventSource failed');
      setIsLoading(false);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  if (isLoading) {
    return (
      <Card className="w-full max-w-6xl mx-auto shadow-2xl">
        <CardContent className="p-6 flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-2xl">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-3xl font-bold">Environmental Awareness Survey Results</CardTitle>
        <CardDescription className="text-lg">Real-time analysis of community responses</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ResponsiveContainer width="100%" height={1500}>
            <BarChart data={results} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="question" type="category" width={250} />
              <Tooltip />
              <Legend />
              <Bar dataKey="yesPercentage" name="Yes" fill="#4CAF50" stackId="stack">
                <LabelList dataKey="yesPercentage" position="center" formatter={(value: number) => `${value}%`} />
              </Bar>
              <Bar dataKey="noPercentage" name="No" fill="#F44336" stackId="stack">
                <LabelList dataKey="noPercentage" position="center" formatter={(value: number) => `${value}%`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
}

