import axios from "axios";

export default async function getCurrentGoodsReceiptNumbering(token) {
  try {
    const latest = await axios.get("/goods-receipt/latest", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (latest.data == []) {
      return "001"
    } else {
      const latestNumbering = latest.data.noMaterialMasuk
      const newNumbering = String(parseInt(latestNumbering) + 1).padStart(3, "0")
      return newNumbering
    }
  } catch (error) {
    console.log(error.message)
  }
}