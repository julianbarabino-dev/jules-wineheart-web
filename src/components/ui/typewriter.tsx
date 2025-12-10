"use client";

import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  baseDelay?: number;
  start?: boolean;
}

export const Typewriter = ({ text, baseDelay = 50, start = false }: TypewriterProps) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (start && currentIndex < text.length) {
      const randomVar = Math.random() * 50;
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, baseDelay + randomVar);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, baseDelay, start, text]);

  // Reset when text or start condition changes
  useEffect(() => {
      setCurrentText('');
      setCurrentIndex(0);
  }, [text, start])

  return <span>{currentText}</span>;
};
