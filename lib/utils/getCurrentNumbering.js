import axios from "axios";

export default async function getCurrentNumbering(db, token) {
  try {
    const latest = await axios.get(`/${db}/latest`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (latest.data == []) {
      return "001"
    } else {
      const latestCode = latest.data.kode
      const latestNumbering = latestCode.split("/")[0]
      const newNumbering = String(parseInt(latestNumbering) + 1).padStart(3, "0")
      return newNumbering
    }
  } catch (error) {
    console.log(error.message)
  }
}