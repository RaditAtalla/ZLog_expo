export default function getMonthInRoman() {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;

  let monthInRoman = "";
  switch (currentMonth) {
    case 1:
      monthInRoman = "I";
      break;

    case 2:
      monthInRoman = "II";
      break;

    case 3:
      monthInRoman = "III";
      break;

    case 4:
      monthInRoman = "IV";
      break;

    case 5:
      monthInRoman = "V";
      break;

    case 6:
      monthInRoman = "VI";
      break;

    case 7:
      monthInRoman = "VII";
      break;

    case 8:
      monthInRoman = "VIII";
      break;

    case 9:
      monthInRoman = "IX";
      break;

    case 10:
      monthInRoman = "X";
      break;

    case 11:
      monthInRoman = "XI";
      break;

    case 12:
      monthInRoman = "XII";
      break;

    default:
      break;
  }

  return monthInRoman
}
