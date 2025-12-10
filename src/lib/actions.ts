"use server";

import { z } from "zod";

// Hardcoding Spanish error messages since i18n is removed.
const getErrorMessages = () => {
  return {
    nameMin: "El nombre debe tener al menos 2 caracteres.",
    emailInvalid: "Por favor, ingresa un email válido.",
    genericError: "Faltan campos. Falló la subscripción.",
    success: (name: string) => `Listo, ${name}! Hemos recibido tu email.`,
  };
}

// The 'lang' parameter is kept but unused for now to avoid breaking the form binding.
export async function subscribeToSoundDiary(lang: 'es' | 'en', prevState: any, formData: FormData) {
  const errorMessages = getErrorMessages();

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
