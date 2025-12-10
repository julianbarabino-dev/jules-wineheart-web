"use client";

import React, { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Radio, Play } from "lucide-react";
import { subscribeToSoundDiary } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Dictionary } from "@/lib/get-dictionary";
import { useLanguage } from "@/context/language-context";

interface SoundDiaryProps {
  dictionary: Dictionary['soundDiary'];
}

function SubmitButton({ dictionary }: { dictionary: Dictionary['soundDiary']['form'] }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="mt-2 self-start bg-primary-foreground text-background font-black uppercase tracking-widest transition-all hover:bg-primary hover:text-primary-foreground">
      {pending ? dictionary.submitting : <><Play size={14} fill="currentColor" /> {dictionary.submit}</>}
    </Button>
  );
}

const SoundDiary = ({ dictionary }: SoundDiaryProps) => {
  const { lang } = useLanguage();
  const formAction = subscribeToSoundDiary.bind(null, lang);
  const initialState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useFormState(formAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: dictionary.toast.success.title,
          description: state.message,
        });
        formRef.current?.reset();
      } else {
        toast({
            title: dictionary.toast.error.title,
            description: state.message,
            variant: "destructive",
        });
      }
    }
  }, [state, toast, dictionary.toast]);

  return (
    <section id="diary" className="bg-secondary/20 pt-24 pb-20 border-t border-border/50 relative z-10">
      <div className="container mx-auto px-6 max-w-xl">
        <Card className="bg-card border-border relative overflow-hidden">
          <CardHeader>
             <div className="flex items-center gap-2 mb-4 text-primary font-mono text-[10px] tracking-widest uppercase">
                <Radio size={12}/> {dictionary.pretitle}
            </div>
            <CardTitle className="font-headline uppercase italic text-2xl">{dictionary.title}</CardTitle>
            <CardDescription>
              {dictionary.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={dispatch} className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input type="text" name="name" placeholder={dictionary.form.namePlaceholder} required className="font-code text-xs uppercase" />
                   {state.errors?.name && <p className="text-destructive text-xs mt-1">{state.errors.name[0]}</p>}
                </div>
                <div className="flex-1">
                  <Input type="email" name="email" placeholder={dictionary.form.emailPlaceholder} required className="font-code text-xs uppercase" />
                  {state.errors?.email && <p className="text-destructive text-xs mt-1">{state.errors.email[0]}</p>}
                </div>
              </div>
              <SubmitButton dictionary={dictionary.form} />
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SoundDiary;
