"use server";

import { z } from "zod";

const subscribeSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, ingresa un email válido." }),
});

export async function subscribeToSoundDiary(prevState: any, formData: FormData) {
  const validatedFields = subscribeSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: firstError || "Faltan campos. Falló la subscripción.",
      success: false,
    };
  }

  const { name, email } = validatedFields.data;

  // Here you would typically send the data to your email list service
  console.log("New Sound Diary Subscription:", { name, email });
  
  // We'll simulate a successful submission.
  return {
    message: `Listo, ${name}! Hemos recibido tu email.`,
    success: true,
    errors: {},
  };
}
