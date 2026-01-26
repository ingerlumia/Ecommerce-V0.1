import { createTransport } from "nodemailer";

const sendMail = async (email,subject,text)=>{
   try{
    const transport = createTransport({
        host:'smtp.gmail.com',
        port: 465,
        auth:{
            user:process.env.GUSER,
            pass:process.env.GPASS,
        },
    });
    await transport.sendMail({
        from:process.env.GUSER,
        to:email,
        subject,
        text,
    });
   }catch(err){console.log(err)}
};

export default sendMail;

