import axios from "axios";

export default async function getCurrentSppNumbering(token) {
  try {
    const latestSpp = await axios.get("/spp/latest", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (latestSpp.data == []) {
      return "001"
    } else {
      const latestCode = latestSpp.data.kode
      const latestNumbering = latestCode.split("/")[0]
      const newNumbering = String(parseInt(latestNumbering) + 1).padStart(3, "0")
      console.log("new numbering " + newNumbering)
      return newNumbering
    }
  } catch (error) {
    console.log(error.message)
  }
}