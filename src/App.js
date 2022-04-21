import logo from "./logo.svg";
import "./App.css";
import { db } from "./firebase";
import { getDatabase, ref, get, child } from "firebase/database";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function App() {
  const [data, setData] = useState([]);
  const [lastData, setLastData] = useState();
  const [distanceChart, setDistanceChart] = useState();
  const [gasChart, setGasChart] = useState();

  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, `data/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
          // console.log("data", data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (data) {
      setLastData(data[Object.keys(data)[Object.keys(data).length - 1]]);
    }
  }, [data]);

  return (
    <div className="App">
      <section
        id={"header"}
        style={{
          backgroundColor: "#464F6C",
          color: "#FFFFFF",
          fontSize: "30px",
          fontWeight: "bold",
          padding: "20px",
        }}
      >
        SMART WASTE MANAGEMENT SYSTEM
      </section>
      <section
        id={"Status"}
        style={{
          backgroundColor: "rgba(242, 247, 212, 1)",
          filter: "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))",
          maxWidth: "30vw",
          margin: "auto",
          marginTop: "32px",
          marginBottom: "32px",
          padding: "32px",
          borderRadius: "10px",
        }}
      >
        <div style={{ color: "#464F6C", fontSize: "24px", fontWeight: "500" }}>
          Status Tempat Sampah
        </div>
        <div
          style={{
            backgroundColor:
              !lastData ?? lastData.distance > 400 ? "#DB9090" : "#A2D05C",
            borderRadius: "10px",
            padding: "16px",
            width: "120px",
            margin: "auto",
            marginTop: "16px",
            color: "#FFFFFF",
            fontWeight: "500",
          }}
        >
          {!lastData ?? lastData.distance < 50 ? "Penuh" : "Tidak Penuh"}
        </div>
        <div
          style={{
            backgroundColor:
              !lastData ?? lastData.gasValue > 400 ? "#DB9090" : "#A2D05C",
            borderRadius: "10px",
            padding: "16px",
            width: "120px",
            margin: "auto",
            marginTop: "16px",
            color: "#FFFFFF",
            fontWeight: "500",
          }}
        >
          {!lastData ?? lastData.gasValue > 400 ? "Bau" : "Tidak Bau"}
        </div>
      </section>
      <section
        id={"Grafik"}
        style={{
          display: "flex",
          margin: "auto",
          justifyContent: "space-evenly",
        }}
      >
        <div>
          <div
            style={{ color: "#464F6C", fontSize: "24px", fontWeight: "500" }}
          >
            Grafik Tingkat Volume Tempat Sampah
          </div>
        </div>
        <div>
          <div
            style={{ color: "#464F6C", fontSize: "24px", fontWeight: "500" }}
          >
            Grafik Tingkat Bau Tempat Sampah
          </div>
        </div>
      </section>
      {/* {console.log("data", data)} */}
      {/* {Object.keys(data).map((item) => {
        return (
          <div keys={item.keys}>
            {console.log("item", item, data[item].distance)}
            <div>{item}</div>
            <div>{data[item].distance}</div>
            <div>{data[item].gasValue}</div>
          </div>
        );
      })} */}
      <section
        id={"footer"}
        style={{
          backgroundColor: "#464F6C",
          color: "#FFFFFF",
          fontSize: "20px",
          fontWeight: "bold",
          padding: "20px",
        }}
      >
        2022 © Kelompok 5 Rekayasa Sistem dan Teknologi Informasi
        <div style={{ fontWeight: "100" }}>
          Fabhian 18219055 | Nadya 18219071 | Graciella 18219075 | Kemal
          18219091 | Tugus 18219117
        </div>
      </section>
    </div>
  );
}

export default App;
