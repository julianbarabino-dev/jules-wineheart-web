"use server";

import { z } from "zod";
import type { Locale } from "./i18n-config";

const getErrorMessages = (lang: Locale) => {
  if (lang === 'en') {
    return {
      nameMin: "Name must be at least 2 characters.",
      emailInvalid: "Please enter a valid email.",
      genericError: "Missing fields. Failed to subscribe.",
      success: (name: string) => `Done, ${name}! We've received your email.`,
    };
  }
  return {
    nameMin: "El nombre debe tener al menos 2 caracteres.",
    emailInvalid: "Por favor, ingresa un email válido.",
    genericError: "Faltan campos. Falló la subscripción.",
    success: (name: string) => `Listo, ${name}! Hemos recibido tu email.`,
  };
}

export async function subscribeToSoundDiary(lang: Locale, prevState: any, formData: FormData) {
  const errorMessages = getErrorMessages(lang);

  const subscribeSchema = z.object({
    name: z.string().min(2, { message: errorMessages.nameMin }),
    email: z.string().email({ message: errorMessages.emailInvalid }),
  });

  const validatedFields = subscribeSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: firstError || errorMessages.genericError,
      success: false,
    };
  }

  const { name, email } = validatedFields.data;

  // Here you would typically send the data to your email list service
  console.log("New Sound Diary Subscription:", { name, email, lang });
  
  // We'll simulate a successful submission.
  return {
    message: errorMessages.success(name),
    success: true,
    errors: {},
  };
}
