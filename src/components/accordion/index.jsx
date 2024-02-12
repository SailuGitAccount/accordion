import { useState } from "react";
import "./styles.css";

export default function Accordion({ data }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelection = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  return (
    <div className="wrapper">
      <h3 className="mTop" style={{ color: "#9b51e0" }}>
        Multi Select Accordion
      </h3>
      {data && data.length > 0 ? (
        <>
          <label className="mTop">
            <input
              type="checkbox"
              onChange={clearSelection}
              disabled={selectedItems.length > 0 ? false : true}
            />
            <span
              style={{
                color: selectedItems.length > 0 ? "#9b51e0" : "#c0c0c0",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              className="slider round"
            >
              Collapse all items
            </span>
          </label>

          <div className="accordion">
            {data.map((dataItem) => {
              const isSelected = selectedItems.includes(dataItem.id);

              return (
                <div key={dataItem.id} className="item">
                  <div
                    onClick={() => toggleSelection(dataItem.id)}
                    className="title"
                  >
                    <h3>{dataItem.question}</h3>
                    <span className="plusIcon">{isSelected ? "-" : "+"}</span>
                  </div>
                  {isSelected && (
                    <div className="content">{dataItem.answer}</div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        "Data not found"
      )}
    </div>
  );
}
