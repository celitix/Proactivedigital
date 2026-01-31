import axios from "axios";

export async function sendOtptoSMS(otp: string, ttl = 10, mbno: string) {
  try {
    const message = `Your One Time Password for healthsquare.in is ${otp} valid for ${ttl} minutes. Do not share this with anyone.`;

    const paylod = {
      listsms: [
        {
          sms: message,
          mobiles: mbno,
          senderid: process.env.SENDERID,
          tempid: process.env.TEMPLATE_ID,
          entityid: process.env.ENTITY_ID,
          unicode: "0",
        },
      ],
    };

    const headers = {
      key: process.env.API_KEY,
      "Content-Type": "application/json",
    };
    const res = await axios.post(
      "https://api.celitix.com/rest/sms/sendsms",
      paylod,
      { headers },
    );

    const isSuccess = res?.data?.smslist?.sms?.status == "Success";

    if (!isSuccess) {
      return false;
    }
    return true;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
