"use server";

export async function submitContactForm(formData: { name: string; company: string; email: string; phone: string; message: string; }) {
  const automationId = process.env.FORM_AUTOMATION_ID || "3";
  const webhookUrl = process.env.FORM_ENDPOINT || "https://asistencia.innavanti.com/webhook/webs/post-form";
  const bearerToken = process.env.WEBHOOK_BEARER || "innavanti_sec_9xk2m8vLq4P5Wz";

  const payload = {
    automation_id: automationId,
    form_data: {
      values: [
        [{ key: "Empresa", value: formData.company, type: "text" }],
        [{ key: "Mensaje", value: formData.message, type: "text" }],
        [{ key: "Telefono", value: formData.phone, type: "phone" }],
        [{ key: "Correo", value: formData.email, type: "email" }],
        [{ key: "Nombre", value: formData.name, type: "title" }]
      ]
    }
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${bearerToken}`
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return { success: true };
    } else {
      return { success: false, error: "Failed to send data" };
    }
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: "Network error" };
  }
}
