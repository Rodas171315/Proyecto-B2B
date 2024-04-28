import { Resend } from 'resend';
import dotenv from "dotenv";

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

// Funcion base de pruebas
/*
(async function () {
    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['rodas171315@unis.edu.gt'],
        subject: 'Hello World',
        html: '<strong>It works!</strong>',
    });

    if (error) {
        return console.error({ error });
    }

    console.log({ data });
})();
*/

export const enviarCorreo = (destinatario, asunto, mensaje) => {
    (async function () {
        const { data, error } = await resend.emails.send({
            from: 'Airlines <no-reply@resend.dev>',
            to: [destinatario],
            subject: asunto,
            html: '<h1>UNIS AIRLINES</h1><p><strong>'+mensaje+'</strong></p>',
            headers: {
                'List-Unsubscribe': '<'+process.env.FRONTEND_URL+'/unsubscribe>',
            },
        });
    
        if (error) {
            return console.error({ error });
        }
    })();
};
