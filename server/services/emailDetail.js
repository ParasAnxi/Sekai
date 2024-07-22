//** IMPORTS */
import nodemailer from "nodemailer";

//** CONFIG */
const mailSender = nodemailer.createTransport({
    service:"gmail",
    port: 465,
    secure: true,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD,
    },
});

//** SEND MAIL */
export const sendMail = async({toEmail,title,message})=>{
    const data = await mailSender.sendMail({
      from: process.env.EMAIL,
      to: toEmail,
      subject: title,
      text: message,
    });
    return data;  
};

