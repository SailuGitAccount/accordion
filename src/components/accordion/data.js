const fetchData = async () => {
  try {
    // Perform an asynchronous operation to fetch data, such as an API call
    const response = await fetch(
      "https://opentdb.com/api.php?amount=100&category=9"
    );

    // Check if the response is successful (status code 200)
    if (response.ok) {
      // Parse the JSON data from the response
      const data = await response.json();

      // Return the fetched data
      return data.results;
    } else {
      // If the response is not successful, throw an error
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    // Handle any errors that occur during the fetching process
    console.error("Error fetching data:", error);
    // Return an empty array or any appropriate fallback value
    return [];
  }
};
export default fetchData;
// const data = [
//   {
//     id: 1,
//     question: "What is the capital of France?",
//     answer: "The capital of France is Paris.",
//   },
//   {
//     id: 2,
//     question: "Who wrote 'Romeo and Juliet'?",
//     answer: "William Shakespeare wrote 'Romeo and Juliet'.",
//   },
//   {
//     id: 3,
//     question: "What is the boiling point of water in Celsius?",
//     answer: "The boiling point of water in Celsius is 100 degrees.",
//   },
//   {
//     id: 4,
//     question: "Who painted the Mona Lisa?",
//     answer: "Leonardo da Vinci painted the Mona Lisa.",
//   },
// ];
// export default data;
