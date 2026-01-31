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

export async function sendOtptoSMSProactive(
  otp: string,
  ttl = 10,
  mbno: string,
) {
  //   curl --location 'https://www.proactivesms.in/REST/sendsms' \
  // --header 'Content-Type: application/json' \
  // --data '{
  //     "listsms": [
  //         {
  //             "sms": "Dear Sir, Your OTP to authenticate your mobile number is {#var#} Team Proactive",
  //             "mobiles": "9876543210",
  //             "senderid": "PROATV",
  //             "tempid": "1707170607733018890"
  //         }
  //     ],
  //     "user": "prodnd",
  //     "password": "f9db0b7becXX"
  // }'
  try {
    const message = `Dear Sir, Your OTP to authenticate your mobile number is ${otp} Team Proactive`;

    const paylod = {
      listsms: [
        {
          sms: message,
          mobiles: mbno,
          senderid: process.env.SENDERID,
          tempid: process.env.TEMPLATE_ID,
          // entityid: process.env.ENTITY_ID,
          // unicode: "0",
        },
      ],
      user: process.env.SMS_USER,
      password: process.env.SMS_PASSWORD,
    };

    const headers = {
      key: process.env.API_KEY,
      "Content-Type": "application/json",
    };
    const res = await axios.post(
      "https://www.proactivesms.in/REST/sendsms",
      paylod,
      { headers },
    );

    const isSuccess = res?.data?.smslist?.sms?.status == "success";

    if (!isSuccess) {
      return false;
    }
    return true;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
