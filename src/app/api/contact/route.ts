import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Resend } from 'resend'; // Importante: Asegúrate de que esto no esté comentado

// Inicializamos Resend con tu clave
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
        return NextResponse.json({ success: false, message: "Faltan datos" }, { status: 400 });
    }

    // 1. GUARDAR EN FIREBASE
    await addDoc(collection(db, "subscribers"), {
      name,
      email,
      createdAt: serverTimestamp(),
      source: "console-uplink"
    });

    // 2. ENVIAR MAIL (Ahora sí está activo)
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Jvles System <onboarding@resend.dev>',
          to: 'julianbarabino@gmail.com', // <--- TU CORREO REAL
          subject: `[UPLINK] Nuevo recluta: ${name}`,
          html: `
            <h1>Nuevo registro en la consola</h1>
            <p><strong>Identidad:</strong> ${name}</p>
            <p><strong>Frecuencia:</strong> ${email}</p>
            <p><em>Datos asegurados en el Mainframe (Firebase).</em></p>
          `
        });
        console.log("Mail enviado a Julian.");
      } catch (emailError) {
        console.error("Error enviando mail:", emailError);
      }
    }

    return NextResponse.json({ success: true, message: "Datos guardados" });

  } catch (error) {
    console.error("Error backend:", error);
    return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 });
  }
}