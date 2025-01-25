import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { Alert, Text, View, ScrollView } from "react-native";
import colors from "@constants/colors";
import "@constants/axiosConfig.js";
import { useLocalSearchParams } from "expo-router";
import Button from "@components/Button";
import Input from "@components/Input";
import axios from "axios";
import Dropdown from "@components/Dropdown";

export default function AddProject() {
  const [projectData, setProjectData] = useState({
    nama: "",
    kode: 0,
    lokasi: "",
    pm: "",
    sem: "",
    pop: "",
    logistik: "",
    penbar: "",
    som: "",
    gsp: "",
    sp: "",
    ark: "",
    qco: "",
    hseo: "",
    sak: "",
    se: "",
  });
  const [pm, setPm] = useState([{}]);
  const [sem, setSem] = useState([{}]);
  const [pop, setPop] = useState([{}]);
  const [logistik, setLogistik] = useState([{}]);
  const [penbar, setPenbar] = useState([{}]);
  const [som, setSom] = useState([{}]);
  const [gsp, setGsp] = useState([{}]);
  const [sp, setSp] = useState([{}]);
  const [ark, setArk] = useState([{}]);
  const [qco, setQco] = useState([{}]);
  const [hseo, setHseo] = useState([{}]);
  const [sak, setSak] = useState([{}]);
  const [se, setSe] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useLocalSearchParams();

  async function handleAdd() {
    setError("");
    const kodeToNumber = parseInt(projectData.kode);
    if (
      projectData.nama == "" ||
      kodeToNumber == 0 ||
      projectData.lokasi == ""
    ) {
      return setError("Harap isi seluruh kolom *");
    }

    if (isNaN(projectData.kode)) {
      return setError("Kode harus angka");
    }

    try {
      const project = await axios.get("/project", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const prevProjectData = project.data;
      let isKodeDuplicate = false;
      prevProjectData.forEach((p) => {
        if (p.kode == parseInt(projectData.kode)) {
          isKodeDuplicate = true;
          return;
        }
      });

      if (isKodeDuplicate) {
        return setError("Kode sudah ada");
      }

      const postProject = await axios.post(
        "/project",
        {
          kode: kodeToNumber,
          nama: projectData.nama,
          lokasi: projectData.lokasi,
          emailAcc1: projectData.sem.label,
          emailAcc2: projectData.pop.label,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await axios.post(
        "/project/pic",
        {
          projectId: postProject.data.id,
          emailPM: projectData.pm.label,
          emailSEM: projectData.sem.label,
          emailPOP: projectData.pop.label,
          emailLogistik: projectData.logistik.label,
          emailPenbar: projectData.penbar.label,
          emailSOM: projectData.som.label,
          emailGSP: projectData.gsp.label,
          emailSP: projectData.sp.label,
          emailARK: projectData.ark.label,
          emailQCO: projectData.qco.label,
          emailHSEO: projectData.hseo.label,
          emailSAK: projectData.sak.label,
          emailSE: projectData.se.label,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjectData({
        nama: "",
        kode: 0,
        lokasi: "",
        pm: "",
        sem: "",
        pop: "",
        logistik: "",
        penbar: "",
        som: "",
        gsp: "",
        sp: "",
        ark: "",
        qco: "",
        hseo: "",
        sak: "",
        se: "",
      });

      Alert.alert(`${projectData.nama} berhasil ditambah`);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    async function getJabatan() {
      const user = await axios.get("/user/no-pic", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = user.data;
      data.forEach((d) => {
        if (d.jabatan == "PM") {
          setPm((x) => [...x, { label: d.email }]);
        } else if (d.jabatan == "SEM") {
          setSem((x) => [...x, { label: d.email }]);
        } else if (d.jabatan == "POP") {
          setPop((x) => [...x, { label: d.email }]);
        } else if (d.jabatan == "LOGISTIK") {
          setLogistik((x) => [...x, { label: d.email }]);
        } else if (d.jabatan == "PENBAR") {
          setPenbar((x) => [...x, { label: d.email }]);
        } else if (d.jabatan == "SOM") {
          setSom((x) => [...x, { label: d.email }]);
        } else if (d.jabatan == "GSP") {
          setGsp((x) => [...x, { label: d.email }]);
        } else if (d.jabatan == "SP") {
          setSp((x) => [...x, { label: d.email }]);
        } else if (d.jabatan == "ARK") {
          setArk((x) => [...x, { label: d.email }]);
        } else if (d.jabatan == "QCO") {
          setQco((x) => [...x, { label: d.email }]);
        } else if (d.jabatan == "HSEO") {
          setHseo((x) => [...x, { label: d.email }]);
        } else if (d.jabatan == "SAK") {
          setSak((x) => [...x, { label: d.email }]);
        } else if (d.jabatan == "SE") {
          setSe((x) => [...x, { label: d.email }]);
        }
      });

      setIsLoading(false);
    }

    getJabatan();
  }, []);

  return (
    <Layout hasBackButton style={{ justifyContent: "space-between" }}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <ScrollView style={{ flexDirection: "column", gap: 16 }}>
            {error == "Harap isi seluruh kolom *" && (
              <Text style={{ color: "red" }}>{error}</Text>
            )}
            <Input
              label={"Nama Projek"}
              placeholder={"nama projek..."}
              value={projectData.nama}
              onChangeText={(text) =>
                setProjectData({ ...projectData, nama: text })
              }
              required
            />
            {error == "Kode sudah ada" && (
              <Text style={{ color: "red" }}>{error}</Text>
            )}
            <Input
              label={"Kode Projek"}
              placeholder={"kode projek..."}
              inputMode={"numeric"}
              value={projectData.kode}
              onChangeText={(text) =>
                setProjectData({ ...projectData, kode: text })
              }
              required
            />
            <Input
              label={"Lokasi"}
              placeholder={"lokasi..."}
              value={projectData.lokasi}
              onChangeText={(text) =>
                setProjectData({ ...projectData, lokasi: text })
              }
              required
            />
            <Dropdown
              label={"PM"}
              placeholder={"PM..."}
              data={pm}
              value={projectData.pm.label}
              onChange={(text) => setProjectData({ ...projectData, pm: text })}
              required
            />
            <Dropdown
              label={"SEM"}
              placeholder={"SEM..."}
              data={sem}
              value={projectData.sem.label}
              onChange={(text) => setProjectData({ ...projectData, sem: text })}
              required
            />
            <Dropdown
              label={"POP"}
              placeholder={"POP..."}
              data={pop}
              value={projectData.pop.label}
              onChange={(text) => setProjectData({ ...projectData, pop: text })}
              required
            />
            <Dropdown
              label={"LOGISTIK"}
              placeholder={"LOGISTIK..."}
              data={logistik}
              value={projectData.logistik.label}
              onChange={(text) =>
                setProjectData({ ...projectData, logistik: text })
              }
              required
            />
            <Dropdown
              label={"PENBAR"}
              placeholder={"PENBAR..."}
              data={penbar}
              value={projectData.penbar.label}
              onChange={(text) =>
                setProjectData({ ...projectData, penbar: text })
              }
              required
            />
            <Dropdown
              label={"SOM"}
              placeholder={"SOM..."}
              data={som}
              value={projectData.som.label}
              onChange={(text) => setProjectData({ ...projectData, som: text })}
              required
            />
            <Dropdown
              label={"GSP"}
              placeholder={"GSP..."}
              data={gsp}
              value={projectData.gsp.label}
              onChange={(text) => setProjectData({ ...projectData, gsp: text })}
              required
            />
            <Dropdown
              label={"SP"}
              placeholder={"SP..."}
              data={sp}
              value={projectData.sp.label}
              onChange={(text) => setProjectData({ ...projectData, sp: text })}
              required
            />
            <Dropdown
              label={"ARK"}
              placeholder={"ARK..."}
              data={ark}
              value={projectData.ark.label}
              onChange={(text) => setProjectData({ ...projectData, ark: text })}
              required
            />
            <Dropdown
              label={"QCO"}
              placeholder={"QCO..."}
              data={qco}
              value={projectData.qco.label}
              onChange={(text) => setProjectData({ ...projectData, qco: text })}
              required
            />
            <Dropdown
              label={"HSEO"}
              placeholder={"HSEO..."}
              data={hseo}
              value={projectData.hseo.label}
              onChange={(text) =>
                setProjectData({ ...projectData, hseo: text })
              }
              required
            />
            <Dropdown
              label={"SAK"}
              placeholder={"SAK..."}
              data={sak}
              value={projectData.sak.label}
              onChange={(text) => setProjectData({ ...projectData, sak: text })}
              required
            />
            <Dropdown
              label={"SE"}
              placeholder={"SE..."}
              data={se}
              value={projectData.se.label}
              onChange={(text) => setProjectData({ ...projectData, se: text })}
              required
            />
          </ScrollView>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 12,
            }}
          >
            <Button
              color={colors.blue_primary}
              label={"Add"}
              style={{ flex: 1 }}
              onPress={handleAdd}
            />
          </View>
        </>
      )}
    </Layout>
  );
}
