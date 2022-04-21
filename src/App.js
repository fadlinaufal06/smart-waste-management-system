import logo from "./logo.svg";
import "./App.css";
import { db } from "./firebase";
import { getDatabase, ref, get, child } from "firebase/database";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [lastData, setLastData] = useState();

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
    if (data)
      setLastData(data[Object.keys(data)[Object.keys(data).length - 1]]);
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
            backgroundColor: lastData ?? lastData.distance > 400 ? "#DB9090" : "#A2D05C",
            borderRadius: "10px",
            padding: "16px",
            width: "120px",
            margin: "auto",
            marginTop: "16px",
            color: "#FFFFFF",
            fontWeight: "500",
          }}
        >
          {lastData ?? lastData.distance < 50 ? "Penuh" : "Tidak Penuh"}
        </div>
        <div
          style={{
            backgroundColor: lastData ?? lastData.gasValue > 400 ? "#DB9090" : "#A2D05C",
            borderRadius: "10px",
            padding: "16px",
            width: "120px",
            margin: "auto",
            marginTop: "16px",
            color: "#FFFFFF",
            fontWeight: "500",
          }}
        >
          {lastData ?? lastData.gasValue > 400 ? "Bau" : "Tidak Bau"}
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
    </div>
  );
}

export default App;
