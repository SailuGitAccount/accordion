import { useState, useEffect, useRef } from "react";
import "./styles.css";

export default function Accordion({ fetchData }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const lastAccordionItemRef = useRef();

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const newData = await fetchData();
        setData((prevData) => [...prevData, ...newData]);
        setHasMore(newData.length > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, [fetchData]);

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    const handleObserver = (entries) => {
      if (entries[0].isIntersecting && hasMore) {
        fetchData();
      }
    };

    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });

    if (lastAccordionItemRef.current) {
      observer.current.observe(lastAccordionItemRef.current);
    }
  }, [loading, hasMore, fetchData]);

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
      {loading && !data.length ? (
        <p>Loading...</p>
      ) : (
        <>
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
                {data.map((dataItem, index) => {
                  const isSelected = selectedItems.includes(dataItem.id);
                  if (data.length === index + 1) {
                    return (
                      <div
                        key={`${index}a`}
                        ref={lastAccordionItemRef}
                        className="item"
                      >
                        <div
                          onClick={() => toggleSelection(dataItem.id)}
                          className="title"
                        >
                          <h3>{dataItem.question}</h3>
                          <span className="plusIcon">
                            {isSelected ? "-" : "+"}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="content">
                            {dataItem.correct_answer}
                          </div>
                        )}
                      </div>
                    );
                  } else {
                    return (
                      <div key={`${index}b`} className="item">
                        <div
                          onClick={() => toggleSelection(dataItem.id)}
                          className="title"
                        >
                          <h3>{dataItem.question}</h3>
                          <span className="plusIcon">
                            {isSelected ? "-" : "+"}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="content">
                            {dataItem.correct_answer}
                          </div>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
              {loading && <p>Loading more...</p>}
            </>
          ) : (
            "Data not found"
          )}
        </>
      )}
    </div>
  );
}
