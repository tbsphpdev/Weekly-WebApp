/* eslint-disable */
export function remToPx(rem: number) {
  const oneRem =
    typeof window === "undefined"
      ? 16
      : parseFloat(window.getComputedStyle(document.documentElement).fontSize);
  return rem * oneRem;
}

export function secondsToHrMin(total: any) {
  const hours = Math.floor(total / (60 * 60));
  const divOfMin = total % (60 * 60);
  const minutes = Math.floor(divOfMin / 60);
  return `${hours} h ${minutes} m`;
}

export const capitalizeFirstLetter = (str: string) => {
  return str?.charAt(0).toUpperCase() + str?.slice(1);
};

export function HourToHrMin(total: any) {
  const hours = Math.floor(total / (60 * 60));
  const divOfMin = total % (60 * 60);
  const minutes = Math.floor(divOfMin / 60);
  const min = minutes > 0 ? `${minutes}m` : "";
  const hr = hours > 0 ? `${hours}h ` : "";
  return `${hr + min}`;
}

export function toHoursMinutesSeconds(totalSeconds: any) {
  const totalMinutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} h ${minutes} m ${seconds} s`;
}

export const spaceCheckRegex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;

export const setCookie = (name: any, value: any, days?: any) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // 7 days
    // date.setTime(date.getTime() + days * 60 * 1000); // 7 days
    expires = "; expires=" + date;
  }
  document.cookie = name + "=" + (value || "") + expires;
};

export const getCookie = (name: any) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteAllCookies = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

const Base64 = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

  encode: function (input: any) {
    let output = "";
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output =
        output +
        this._keyStr.charAt(enc1) +
        this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) +
        this._keyStr.charAt(enc4);
    }

    return output;
  },

  decode: function (input: any) {
    let output = "";
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {
      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }

    output = Base64._utf8_decode(output);

    return output;
  },

  _utf8_encode: function (string: any) {
    string = string?.replace(/\r\n/g, "\n");
    let utftext = "";

    for (let n = 0; n < string?.length; n++) {
      let c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }

    return utftext;
  },

  _utf8_decode: function (utftext: any) {
    let string = "";
    let i = 0;
    let c1, c2, c3: any;
    let c: any = (c1 = c2 = 0);

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(
          ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        );
        i += 3;
      }
    }

    return string;
  },
};

export const cryptoEncryption = async (data: any) => {
  const plaintext = JSON.stringify(data);
  return Base64.encode(plaintext);
};

export const cryptoDecryption = (data: any) => {
  return Base64.decode(data);
};

export const HabitStarter = [
  "Automatic time tracking",
  "See your data in graphs",
  "Track your habits (3)",
  "Limited apps/URLs in Habits (3)",
  "Data visualization of your data overview",
  "Connect with friends and colleagues",
  "Share data with your friends and colleagues",
  "Set daily productive and habit goals",
  "Smart notifications to help you reach your goals",
];
export const HabitEnthusiast = [
  "Everything in Habit Starter +",
  "Look at app/URL History Data",
  "Unlimited apps/URLs in Habits",
  "Compete with your friends and colleagues",
  "Get detailed data report after each competition",
  "Gain access to new Beta features",
  "Remove ads",
];

export const habitFeatureList: any[] = [
  { name: "Habit Tracking", free: "3 Habits", paid: "3 Habits" },
  {
    name: "URL & App Tracking",
    free: "3 URL Auto Tracking",
    paid: "Unlimited",
  },
];

export const dataFeatureList: any[] = [
  {
    name: "Data Visualizations of Each App & Site You Visit",
    free: "-",
    paid: "+",
  },
  {
    name: "Basic Data Visualization",
    free: "+",
    paid: "+",
  },
  {
    name: "Manual Data Re-Categorization",
    free: "+",
    paid: "+",
  },
  {
    name: "Data Reports",
    free: "+",
    paid: "+",
  },
];

export const socialFeatureList: any[] = [
  {
    name: "Competitions",
    free: "-",
    paid: "+",
  },
  {
    name: "Connect With Others",
    free: "+",
    paid: "+",
  },
];
