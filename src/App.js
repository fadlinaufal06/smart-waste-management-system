import logo from "./logo.svg";
import "./App.css";
import { db } from "./firebase";
import { getDatabase, ref, get, child } from "firebase/database";
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

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
      let tempDistance = [["Timestamp", "Distance"]];
      for (const property in data) {
        tempDistance.push([
          new Date(property).toUTCString(),
          data[property].distance,
        ]);
      }
      console.log(tempDistance);
      setDistanceChart(tempDistance);

      let tempGas = [["Timestamp", "GasValue"]];
      for (const property in data) {
        tempGas.push([
          new Date(property).toUTCString(),
          data[property].gasValue,
        ]);
      }
      console.log(tempGas);
      setGasChart(tempGas);
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
          marginBottom: "64px",
        }}
      >
        <div>
          <div
            style={{ color: "#464F6C", fontSize: "24px", fontWeight: "500" }}
          >
            Grafik Tingkat Volume Tempat Sampah
          </div>
          <Chart
            chartType="Line"
            width="100%"
            height="400px"
            data={distanceChart}
            options={{
              chart: {
                title: "Grafik Tingkat Volume Tempat Sampah",
                // subtitle: "in millions of dollars (USD)",
              },
            }}
          />
        </div>
        <div>
          <div
            style={{ color: "#464F6C", fontSize: "24px", fontWeight: "500" }}
          >
            Grafik Tingkat Bau Tempat Sampah
          </div>
          <Chart
            chartType="Line"
            width="100%"
            height="400px"
            data={gasChart}
            options={{
              chart: {
                title: "Grafik Tingkat Bau Tempat Sampah",
                // subtitle: "in millions of dollars (USD)",
              },
            }}
          />
        </div>
      </section>
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

export const dummyData = [
  [
    "Day",
    "Guardians of the Galaxy",
    "The Avengers",
    "Transformers: Age of Extinction",
  ],
  [1, 37.8, 80.8, 41.8],
  [2, 30.9, 69.5, 32.4],
  [3, 25.4, 57, 25.7],
  [4, 11.7, 18.8, 10.5],
  [5, 11.9, 17.6, 10.4],
  [6, 8.8, 13.6, 7.7],
  [7, 7.6, 12.3, 9.6],
  [8, 12.3, 29.2, 10.6],
  [9, 16.9, 42.9, 14.8],
  [10, 12.8, 30.9, 11.6],
  [11, 5.3, 7.9, 4.7],
  [12, 6.6, 8.4, 5.2],
  [13, 4.8, 6.3, 3.6],
  [14, 4.2, 6.2, 3.4],
];

export default App;
